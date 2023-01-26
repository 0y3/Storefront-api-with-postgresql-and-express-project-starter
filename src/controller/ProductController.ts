/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { RequestHandler } from "express";
import { ProductModel } from "../model/ProductModel";

const UModel = new ProductModel();

export class ProductController {
	index: RequestHandler = async (req, res) => {
		const result = await UModel.index();
		return res.json(result);
	};

	show: RequestHandler = async (req, res) => {
		const id = req.params.id;
		const result = await UModel.show(id);
		return res.json(result);
	};

	create: RequestHandler = async (req, res) => {
		// Get user input
		const name = String(req.query.name);
		const price = Number(req.query.price);
		const category = String(req.query.category);

		// Validate user input
		if (!name || !price) {
			return res.status(400).json("All Name and Price input are required");
		}
		const result = await UModel.create({ name, price, category });
		return res.json(result);
	};

	category: RequestHandler = async (req, res) => {
		const category = req.params.categoryname;
		// console.log(category);
		const result = await UModel.Bycategory(category);
		return res.json(result);
	};

	topcategory: RequestHandler = async (req, res) => {
		const result = await UModel.topcategory();
		return res.json(result);
	};
}
