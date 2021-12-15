import express, { Request, Response } from "express";

const port = process.env.PORT || 3000;
const app = express();

app.get("/", (req: Request, res: Response) => {
	return res.sendStatus(200);
});

app.listen(port, () => console.log(`Listening on ${port}`));
