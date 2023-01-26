/* eslint-disable @typescript-eslint/restrict-template-expressions */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import client from "../database";

export interface World {
	name: string;
	price: number;
	category: string | null;
}

export class ProductModel {
	async index(): Promise<World[]> {
		try {
			const conn = await client.connect();
			const sql = "select * from product";
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (e) {
			throw new Error(`Error in db product ${e}`);
		}
	}

	async show(id: string): Promise<World> {
		try {
			const sql = "SELECT * FROM product WHERE id=$1";
			const conn = await client.connect();
			const result = await conn.query(sql, [id]);
			conn.release();
			// console.log(result.rows[0]);
			return result.rows[0];
		} catch (e) {
			throw new Error(`Could not find product. Error: ${e}`);
		}
	}

	async create(p: World): Promise<World> {
		try {
			const { name, price, category } = p;
			const conn = await client.connect();
			const sql =
				"INSERT INTO product (name, price, category) VALUES($1, $2, $3) RETURNING *";
			const result = await conn.query(sql, [name, price, category]);
			const data = result.rows[0];
			conn.release();
			return data;
		} catch (e) {
			throw new Error(`Could not add new product Error: ${e}`);
		}
	}

	async Bycategory(category: string): Promise<World[]> {
		try {
			const conn = await client.connect();
			const sql = `select * from product where category LIKE '%${category}%'`;
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (e) {
			throw new Error(`Error in db product ${e}`);
		}
	}

	async topcategory(): Promise<World[]> {
		try {
			const conn = await client.connect();
			const sql = `select category, count(category) AS category_count FROM product GROUP BY category ORDER BY category_count DESC limit 5`;
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (e) {
			throw new Error(`Error in db product ${e}`);
		}
	}
}
