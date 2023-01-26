import * as express from "express";
import user from "./api/userRoute";
import product from "./api/productRoute";
import order from "./api/orderRoute";

const routes = express.Router();

routes.use("/api/user", user);
routes.use("/api/product", product);
routes.use("/api/order", order);

export default routes;
