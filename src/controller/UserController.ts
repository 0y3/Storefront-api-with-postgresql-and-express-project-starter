/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { UserModel } from "../model/UserModel";
import { RequestHandler } from "express";

const UModel = new UserModel();

export class UserController {
	index: RequestHandler = async (req, res) => {
		const result = await UModel.index();
		return res.json(result);
	};

	show: RequestHandler = async (req, res) => {
		const id = req.params.id;
		// console.log(req.params.id);
		const result = await UModel.show(id);
		return res.json(result);
	};

	create: RequestHandler = async (req, res) => {
		// Get user input
		const firstName = String(req.query.firstName);
		const lastName = String(req.query.lastName);
		const password = String(req.query.password);
		// console.log(req.query);
		// return res.json(req);

		// Validate user input
		if (!firstName || !lastName || !password) {
			return res.status(400).json("All firstName lastName and password input are required");
		}
		const result = await UModel.create({firstName, lastName, password });
		return res.json(result);
	};

	delete: RequestHandler = async (req, res) => {
		const id = req.params.id;
		const result = await UModel.delete(id);
		return res.json(result);
	};
}
