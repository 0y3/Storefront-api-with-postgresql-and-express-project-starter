/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { RequestHandler } from "express";
import { OrderModel } from "../model/OrderModel";

const UModel = new OrderModel();

export class OrderController {
	index: RequestHandler = async (req, res) => {
		const result = await UModel.index();
		return res.json(result);
	};

	show: RequestHandler = async (req, res) => {
		const id = req.params.id;
		const result = await UModel.show(id);
		return res.json(result);
	};

	currentOrder: RequestHandler = async (req, res) => {
		const id = req.params.id;
		const orderstatus = req.params.orderstatus;
		const result = await UModel.currentOrder(id,orderstatus);
		return res.json(result);
	};

	create: RequestHandler = async (req, res) => {
		// Get user input
		const product_id = Number(req.query.product_id);
		const user_id = Number(req.query.user_id);
		const quantity = Number(req.query.quantity);
		const status = String(req.query.status);

		// Validate user input
		if (!product_id || !user_id || !quantity || !status) {
			return res.status(400).json("All status, user id , product id, quantity input are required");
		}
		const result = await UModel.create({ product_id, user_id, quantity, status });
		return res.json(result);
	};
}
