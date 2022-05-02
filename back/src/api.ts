import { Router } from "express";

export const api = Router();

api.get("/date", (req, res) => {
  res.json({ date: new Date() });
});
