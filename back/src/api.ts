import { Router, json } from "express";
import { Article } from "./interfaces/article";

const articles: Article[] = [
  {
    name: "truc",
    price: 2.45,
    qty: 456,
  },
  {
    name: "bidule",
    price: 2.45,
    qty: 456,
  },
];

export const apiRouter = Router();

apiRouter.get("/date", (req, res) => {
  res.json({ date: new Date() });
});

apiRouter.get("/articles", (req, res) => {
  res.json(articles);
});

apiRouter.use(json());

apiRouter.post("/articles", (req, res) => {
  (async () => {
    try {
      const article = req.body;
      console.log("article: ", article);
      articles.push(article);
      res.status(201).end();
    } catch (err) {
      console.log("err: ", err);
      res.status(500).end();
    }
  })();
});
