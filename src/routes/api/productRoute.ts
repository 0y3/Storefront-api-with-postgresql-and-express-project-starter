/* eslint-disable @typescript-eslint/no-misused-promises */
import * as express from "express";
import * as Auth from "../../middleware/auth";
import { ProductController } from "../../controller/ProductController";

const UController = new ProductController();
const productroute = express.Router();

productroute.get("/", UController.index);
productroute.get("/:id", UController.show);
productroute.get("/category/:categoryname", UController.category);
productroute.get("/getcategory/top", UController.topcategory);
productroute.post("/", Auth.authorize(["addReq"]), UController.create);

export default productroute;
