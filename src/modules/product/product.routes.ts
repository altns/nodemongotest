import { Router } from "express";
import {
  create,
  deleteProductById,
  getById,
  listAll,
  update,
} from "./controller/product.controller";
import { validateSchema } from "../../midlewares/validateSchema";
import { productSchema } from "./model/productSchema.model";

const productRoutes = Router();

productRoutes.post("/product", validateSchema(productSchema), create);
productRoutes.get("/product/:id", getById);
productRoutes.put("/product/:id", validateSchema(productSchema), update);
productRoutes.delete("/product/:id", deleteProductById);
productRoutes.get("/products", listAll);

export { productRoutes };
