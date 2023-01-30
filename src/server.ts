/* eslint-disable @typescript-eslint/restrict-template-expressions */
import express, { Request, Response } from "express";
// import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as jwt from "./util/jwt";
import indexroute from "./routes/indexroute";

dotenv.config();

const app: express.Application = express();
const port = process.env.PORT ?? 2130;
const address = process.env.HOST ?? "localhost";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req: Request, res: Response) {
	// res.send("Hello World!!!");
	res.send(req.body);
});

app.use("/", indexroute);

app.listen(port, function () {
	console.log(
		`starting app on: ${address}:${port}`,
		jwt.generateToken("0y3 novocaine", 1),
	);
});
