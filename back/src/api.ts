import { Router } from "express";

export const apiRouter = Router();

apiRouter.get("/date", (req, res) => {
  res.json({ date: new Date() });
});
