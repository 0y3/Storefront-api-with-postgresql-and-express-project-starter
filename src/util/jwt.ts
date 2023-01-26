import * as jwt from "jsonwebtoken";
import * as fs from "fs";
import * as path from "path";

/**
 * generates JWT used for local testing
 */
export const generateToken = (nameJWT: string, id: number): string => {
	// information to be encoded in the JWT
	const payload = {
		name: nameJWT,
		userId: id,
		accessTypes: ["getReq", "addReq", "updateReq", "deleteReq"],
	};
	// read private key value
	const privateKey = fs.readFileSync(path.join(__dirname, "../../private.key"));

	const signInOptions: jwt.SignOptions = {
		// RS256 uses a public/private key pair. The API provides the private key
		// to generate the JWT. The client gets a public key to validate the
		// signature
		algorithm: "RS256",
		expiresIn: "1h",
	};

	// generate JWT
	const data = jwt.sign(payload, privateKey, signInOptions);
	return data;
};

export interface TokenPayload {
	exp: number;
	accessTypes: string[];
	name: string;
	userId: number;
}

/**
 * checks if JWT token is valid
 *
 * @param token the expected token payload
 */
// export const validateToken = async (token: string): Promise<TokenPayload> => {
// 	const publicKey = fs.readFileSync(path.join(__dirname, "../../public.key"));

// 	const verifyOptions: jwt.VerifyOptions = { algorithms: ["RS256"] };
// console.log(token);
// return await new Promise((resolve, reject) => {
// 	jwt.verify(token, publicKey, verifyOptions, function (_err, decoded) {
// 		console.log(decoded);
// 		// (error: null, decoded: TokenPayload) => {
// 			if (error != null) return reject(error);
// 			resolve(decoded);
// 	});
// });

// try {
// 	const decoded = verify(token, publicKey, verifyOptions);
// 	return decoded;
// } catch (err) {
// 	return res.status(401).send("Invalid Token");
// }
// };

export const verifyJwt = <T>(token: string): T | null => {
	try {
		const publicKey = fs.readFileSync(path.join(__dirname, "../../public.key"));

		const verifyOptions: jwt.VerifyOptions = { algorithms: ["RS256"] };
		return jwt.verify(token, publicKey, verifyOptions) as T;
	} catch (error) {
		return null;
	}
};
