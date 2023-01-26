import { Request, Response, NextFunction } from "express";
import * as jwtUil from "../util/jwt";

export const authorize =
	(allowedAccessTypes: string[]) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			let jwt = req.headers.authorization;

			// verify request has token
			if (jwt == null) {
				return res.status(401).json({ message: "token Requied" });
			}

			// remove Bearer if using Bearer Authorization mechanism
			if (jwt.toLowerCase().startsWith("bearer")) {
				jwt = jwt.slice("bearer".length).trim();
			}

			// verify token hasn't expired yet
			const decodedToken = jwtUil.verifyJwt(jwt); // validateToken(jwt);
			console.log(`---- /n `, decodedToken);
			if (decodedToken == null) {
				return res.status(401).json({ message: "Invalid token" });
			} else {
				next();
			}
			// const hasAccessToEndpoint = allowedAccessTypes.some((at) =>
			// 	decodedToken.accessTypes.some((uat: string) => uat === at),
			// );

			// if (!hasAccessToEndpoint) {
			// 	return res
			// 		.status(401)
			// 		.json({ message: "No enough privileges to access endpoint" });
			// }

			// next();
		} catch (error) {
			console.log(`---- /E `, error);
			if (error === "TokenExpiredError") {
				return res.status(401).json({ message: "Expired token" });
			}

			return res.status(500).json({ message: "Failed to authenticate user" });
		}
	};
