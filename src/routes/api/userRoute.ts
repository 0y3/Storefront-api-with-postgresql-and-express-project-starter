/* eslint-disable @typescript-eslint/no-misused-promises */
// import * as express from "express";
import express, { Request, Response } from "express";
import { UserController } from "../../controller/UserController";
import * as Auth from "../../middleware/auth";

const UController = new UserController();
const userroute = express.Router();

userroute.get("/", Auth.authorize(["getReq"]), UController.index);
userroute.get("/:id", Auth.authorize(["getReq"]), UController.show);
userroute.post("/", Auth.authorize(["addReq"]), UController.create);

// userroute.get("/", (req: Request, res: Response) => {
// 	res.send(req.body);
// });

export default userroute;
