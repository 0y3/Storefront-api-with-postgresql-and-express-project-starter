/* eslint-disable prettier/prettier */
import * as jwt from "../util/jwt";

describe("Jwt Utility", function () {
	const userName = "test";
	const userId = 1;
	let token: string;
	const wrongtoken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsInVzZXJJZCI6MjAwLCJhY2Nlc3NUeXBlcyI6WyJnZXRSZXEiLCJhZGRSZXEiLCJ1cGRhdGVSZXEiLCJkZWxldGVSZXEiXSwiaWF0IjoxNjc2MzcyNzE1LCJleHAiOjE2NzYzNzYzMTV9.FJFpOjsuAaTG4KclCdKt0rGFQLfEa8v0gShSEOdpfn6nor0ANMcLfihuHpIyukz_TG8NKmm6zUXGvPA-o3NfWUnKh-kuJWkWCT5zFW1OhycG9_dphCDIDutDjYCEUampLu32v8YPObqPRNvQTt-KVz-zSASH_rea6AQw70W1cZXyv-v6cplIIsoe7PXs9Z0xYt3WSc2L8Mk3RE_3md6_1QtI5DD5JHHl7x95t3zcYuC7c8BLGXPDZilD6Mthw1Dkei2Y_C";

	beforeAll(async () => {
		token = await jwt.generateToken(userName, userId); // save the token!
	});

	it(`Should be able to generate token`, () => {
		expect(jwt.generateToken).toBeDefined();
		expect(jwt.generateToken(userName, userId)).toBeTruthy();
	});

	it(`Should verify generate token`, () => {
		expect(jwt.verifyJwt).toBeDefined();
		expect(jwt.verifyJwt(token)).toBeTruthy();
	});

	it(`Should be false on verify wrong token`, () => {
		expect(jwt.verifyJwt).toBeDefined();
		expect(jwt.verifyJwt(wrongtoken)).toBeFalsy();
	});
});
