/* eslint-disable @typescript-eslint/restrict-template-expressions */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import client from "../database";
import * as bcrypt from "bcrypt";
import dotenv from "dotenv";

export interface World {
	// id: number;
	firstName: string;
	lastName: string;
	password: string;
}

export class UserModel {
	async index(): Promise<World[]> {
		try {
			const conn = await client.connect();
			const sql = "select * from users";
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (e) {
			throw new Error(`Error in db users ${e}`);
		}
	}

	async show(id: string): Promise<World> {
		try {
			const sql = "SELECT * FROM users WHERE id=$1";
			const conn = await client.connect();
			const result = await conn.query(sql, [id]);
			conn.release();
			console.log(result.rows[0]);
			return result.rows[0];
		} catch (e) {
			throw new Error(`Could not find user ${id}. Error: ${e}`);
		}
	}

	async create(p: World): Promise<World> {
		try {
			const { firstName, lastName, password } = p;
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(password, salt);
			const conn = await client.connect();
			const sql =
				"INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *";
			const result = await conn.query(sql, [firstName, lastName, hash]);
			const data = result.rows[0];
			conn.release();
			return data;
		} catch (e) {
			throw new Error(`Could not add new user Error: ${e}`);
		}
	}

	async delete(id: string): Promise<World> {
		try {
			const conn = await client.connect();
			const sql = "DELETE FROM users WHERE id=($1)";
			const result = await conn.query(sql, [id]);
			const data = result.rows[0];
			conn.release();
			return data;
		} catch (e) {
			throw new Error(`Could delete user ${id}. Error: ${e}`);
		}
	}
}
