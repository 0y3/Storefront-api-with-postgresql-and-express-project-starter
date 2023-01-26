/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import e from "express";
import client from "../database";

export interface World {
	product_id: number;
	user_id: number;
	quantity: number;
	status: string;
}

export class OrderModel {
	async index(): Promise<World[]> {
		try {
			const conn = await client.connect();
			const sql = "select * from orders";
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (e) {
			throw new Error(`Error in db orders ${e}`);
		}
	}

	async show(id: string): Promise<World> {
		try {
			const sql = "SELECT * FROM orders WHERE id=$1";
			const conn = await client.connect();
			const result = await conn.query(sql, [id]);
			conn.release();
			console.log(result.rows[0]);
			return result.rows[0];
		} catch (e) {
			throw new Error(`Could not find orders ${id}. Error: ${e}`);
		}
	}

	async create(p: World): Promise<World> {
		try {
			const { product_id, user_id, quantity, status } = p;
			const conn = await client.connect();
			const sql = "INSERT INTO orders (product_id, user_id, quantity, status) VALUES($1, $2, $3, $4) RETURNING *";
			const result = await conn.query(sql, [product_id, user_id, quantity, status]);
			const data = result.rows[0];
			conn.release();
			return data;
		} catch (e) {
			throw new Error(`Could not add new orders Error: ${e}`);
		}
	}

	async currentOrder(id: string, status:string | null): Promise<World[]> {
		try {
			if(status == null){status = `active`;}
			else{status = `complete`;}
			const sql = "SELECT * FROM orders WHERE user_id=$1 AND status =$2 ORDER BY id DESC";
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
