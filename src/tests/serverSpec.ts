import express, { Express, Response, Request } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 2130;
const address = process.env.HOST ?? "localhost";

describe("Index Route", function () {
	it(`Should returns status code 200 & Start Server at http:// ${address}:${port}`, () => {
		app.get(`http://${address}:${port}`, function (req, res) {
			expect(res.statusCode).toEqual(200);
		});
	});

	it("Should Fall ", () => {
		app.get(`http://${address}:${port}`, function (req, res) {
			expect(res.statusCode).toEqual(404);
		});
	});
});
