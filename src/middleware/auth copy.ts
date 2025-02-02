/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { RequestHandler } from "express";

dotenv.config();

const config = process.env;

export const verifyToken: RequestHandler = (req, res, next) => {
	const token =
		req.body.token || req.query.token || req.headers["x-access-token"];

	if (!token) {
		return res.status(403).send("A token is required for authentication");
	}
	try {
		return jwt.verify(token, "cooldd");
		// return jwt.verify(token, config.TOKEN_PRIVATE_KEY);
		// req.user = decoded;
	} catch (err) {
		return res.status(401).send("Invalid Token");
	}
	next();
};
