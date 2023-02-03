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
		const product = await UModel.showproduct(id);
		return res.json({
			"order":result,
			"products": product
		});
	};

	currentOrder: RequestHandler = async (req, res) => {
		const id = req.params.id;
		const orderstatus = req.params.orderstatus;
		const result = await UModel.currentOrder(id,orderstatus);
		return res.json(result);
	};

	OrderProduct: RequestHandler = async (req, res) => {
		const id = req.params.id;
		const result = await UModel.show(id);
		const product = await UModel.showproduct(id);
		return res.json({
			"order":result,
			"products": product
		});
	};

	create: RequestHandler = async (req, res) => {
		// Get user input
		const total = Number(req.body.total);
		const user_id = Number(req.body.user_id);
		const status = String(req.body.status);

		const data = req.body;
		// console.log(req.body.products.length);
		// return res.json(data.products[0].product_id);

		// Validate user input
		if (!total || !user_id || !status || !(data.products.length > 0) ) {
			return res.status(400).json("All status, user id , total price, product input are required");
		}
		const result:any = await UModel.create(data);
		let resultOrderProduct;
		for (let i = 0; i < data.products.length; i++) {
			resultOrderProduct = await UModel.createOrderProd(result,data.products[i]);
		}
		return res.json({
			"order":result, 
			"product":resultOrderProduct
		});
	};
}
