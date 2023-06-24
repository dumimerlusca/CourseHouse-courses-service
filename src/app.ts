import { errorMiddleware } from "@dumiorg/coursehouse-common";
import cors from "cors";
import express, { json } from "express";
import { router } from "./routes/routes";

const app = express();

app.use(json());
app.use(cors());

app.use(router);

app.use(errorMiddleware);

export { app };
