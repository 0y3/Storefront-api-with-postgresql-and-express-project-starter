/* eslint-disable @typescript-eslint/no-misused-promises */
import * as express from "express";
import * as Auth from "../../middleware/auth";
import { OrderController } from "../../controller/OrderController";

const UController = new OrderController();
const orderroute = express.Router();

orderroute.get(
	"/user/:id",
	Auth.authorize(["getReq"]),
	UController.currentOrder,
);
orderroute.get(
	"/user/:id/:orderstatus",
	Auth.authorize(["getReq"]),
	UController.currentOrder,
);

orderroute.get(
	"/orderproduct/:id/",
	Auth.authorize(["getReq"]),
	UController.OrderProduct,
);

orderroute.post("/", Auth.authorize(["addReq"]), UController.create);
orderroute.get("/", Auth.authorize(["getReq"]), UController.index);

export default orderroute;
