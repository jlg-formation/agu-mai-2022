import { Router, json } from "express";
import { Article } from "./interfaces/article";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  promises,
  writeFileSync,
} from "fs";
import { BehaviorSubject, debounceTime } from "rxjs";
import { dirname } from "path";

const noop = () => {};

noop();

const generateId = () => {
  return Date.now() + "_" + Math.round(Math.random() * 1e9);
};

const ARTICLE_FILENAME = "data/articles.json";

const init = () => {
  try {
    mkdirSync(dirname(ARTICLE_FILENAME), { recursive: true });
    if (!existsSync(ARTICLE_FILENAME)) {
      writeFileSync(ARTICLE_FILENAME, "[]");
    }
    const articles = JSON.parse(
      readFileSync(ARTICLE_FILENAME, { encoding: "utf-8" })
    );
    articles$.next(articles);

    articles$.pipe(debounceTime(2000)).subscribe((articles) => {
      (async () => {
        const str = JSON.stringify(articles, undefined, 2);
        await promises.writeFile(ARTICLE_FILENAME, str);
      })();
    });
  } catch (err) {
    console.log("err: ", err);
  }
};

const articles$ = new BehaviorSubject<Article[]>([]);

init();

export const apiRouter = Router();

apiRouter.get("/crash", () => {
  (async () => {
    throw new Error("oups... crashed.");
  })();
});

apiRouter.get("/date", (_req, res) => {
  res.json({ date: new Date() });
});

apiRouter.get("/articles", (_req, res) => {
  res.json(articles$.value);
});

apiRouter.use(json());

apiRouter.post("/articles", (req, res) => {
  (async () => {
    try {
      const article = req.body;
      article.id = generateId();
      console.log("article: ", article);
      articles$.value.push(article);
      articles$.next(articles$.value);
      res.status(201).end();
    } catch (err) {
      console.log("err: ", err);
      res.status(500).end();
    }
  })();
});

apiRouter.delete("/articles", (req, res) => {
  (async () => {
    try {
      const ids = req.body as string[];
      console.log("ids: ", ids);
      articles$.next(articles$.value.filter((a) => !ids.includes(a.id)));
      res.status(204).end();
    } catch (err) {
      console.log("err: ", err);
      res.status(500).end();
    }
  })();
});
