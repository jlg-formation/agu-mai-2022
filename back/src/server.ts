import express from "express";
import serveIndex from "serve-index";
import cors from "cors";

import { apiRouter } from "./api";

console.log("About to start the server...");

const app = express();
const port = +(process.env.GSTOCK_PORT || 3000);
const wwwDir = "../front/dist/front";

app.use((req, res, next) => {
  console.log("req: ", req.url, this);
  next();
});

app.use(cors());

app.use("/api", apiRouter);

app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));

app.get("/*", (req, res) => {
  res.sendFile("index.html", { root: wwwDir });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
