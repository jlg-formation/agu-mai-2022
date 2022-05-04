import { Router, json } from "express";
import { Article } from "./interfaces/article";

const noop = () => {};

noop();

const generateId = () => {
  return Date.now() + "_" + Math.round(Math.random() * 1e9);
};

let articles: Article[] = [
  {
    id: "1",
    name: "truc",
    price: 2.45,
    qty: 456,
  },
  {
    id: "2",
    name: "bidule",
    price: 2.45,
    qty: 456,
  },
];

export const apiRouter = Router();

apiRouter.get("/date", (_req, res) => {
  res.json({ date: new Date() });
});

apiRouter.get("/articles", (_req, res) => {
  res.json(articles);
});

apiRouter.use(json());

apiRouter.post("/articles", (req, res) => {
  (async () => {
    try {
      const article = req.body;
      article.id = generateId();
      console.log("article: ", article);
      articles.push(article);
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
      articles = articles.filter((a) => !ids.includes(a.id));
      res.status(204).end();
    } catch (err) {
      console.log("err: ", err);
      res.status(500).end();
    }
  })();
});
