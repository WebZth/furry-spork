import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

const app: Application = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.get("/", (req: Request, res: Response) => {
	res.send({ data: null, success: true, message: "Success" });
});

export default app;
