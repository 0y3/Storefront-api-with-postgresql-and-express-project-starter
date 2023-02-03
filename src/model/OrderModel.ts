/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import e from "express";
import client from "../database";
import format from "pg-format";

export interface World {
	user_id: number;
	quantity: number;
	total: number;
	status: string;
}

export interface Orders_ {
	product_id: number;
	order_product_id: number;
	quantity: number;
	total_price: number;
	status: string;
}

export class OrderModel {
	async index(): Promise<World[]> {
		try {
			const conn = await client.connect();
			const sql = "select * from order_product";
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (e) {
			throw new Error(`Error in db orders ${e}`);
		}
	}

	async show(id: (string | number)): Promise<World> {
		try {
			const sql = "SELECT * FROM order_product WHERE id=$1";
			const conn = await client.connect();
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (e) {
			throw new Error(`Could not find orders ${id}. Error: ${e}`);
		}
	}

	async showproduct(id: (string | number)): Promise<World[]> {
		try {
			const sql = "SELECT * FROM orders WHERE order_product_id=$1";
			const conn = await client.connect();
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows;
		} catch (e) {
			throw new Error(`Could not find orders ${id}. Error: ${e}`);
		}
	}


	async create(p: World): Promise<World> {
		try {
			const { user_id, total, status } = p;
			const conn = await client.connect();
			const sql = "INSERT INTO order_product (user_id, total, status) VALUES($1, $2, $3) RETURNING *";
			const result = await conn.query(sql,[user_id, total, status]);
			const data = result.rows[0].id;
			conn.release();
			return data;
		} catch (e) {
			throw new Error(`Could not add new orders Error: ${e}`);
		}
	}

	async createOrderProd(id:(number | string), p: Orders_): Promise<Orders_> {
		try {
			const { product_id, quantity, total_price } = p;
			const conn = await client.connect();
			const sql = "INSERT INTO orders (order_product_id, product_id, quantity, total_price) VALUES($1, $2, $3, $4) RETURNING *";
			const result = await conn.query(sql,[id, product_id, quantity, total_price]);
			const data = result.rows[0];
			conn.release();
			return data;
		} catch (e) {
			throw new Error(`Could not add new orders Product Error: ${e}`);
		}
	}

	async currentOrder(id: string, status:string | null): Promise<World[]> {
		try {
			if(status == null){status = `active`;}
			else{status = `complete`;}
			const sql = "SELECT * FROM order_product WHERE user_id=$1 AND status =$2 ORDER BY id DESC";
			const conn = await client.connect();
			const result = await conn.query(sql, [id, status]);
			conn.release();
			// console.log(result.rows[0]);
			return result.rows;
		} catch (e) {
			throw new Error(`Could not find orders. Error: ${e}`);
		}
	}

}
