import express, { Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import { config } from "dotenv";

config();

const corsOptions: CorsOptions = {
	origin: process.env.APP_URL,
	optionsSuccessStatus: 200,
};

const port = process.env.PORT || 3000;
const app = express();
app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
	return res.sendStatus(200);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
