import express from "express";
import cors from "cors";
import { json } from "express";
import { router } from "./routes/routes";

const app = express();

app.use(json());
app.use(cors());

app.use(router);

app.post("/api/test", (req, res) => {
  res.send("Test");
});

export { app };
