import { Router } from "express";
import {
  create,
  deleteProductById,
  getById,
  getProductsAbovePrice,
  getProductsByDescription,
  listAll,
  update,
} from "./controller/product.controller";
import { validateSchema } from "../../midlewares/validateSchema";
import { productSchema } from "./schema/product.schema";
import { priceQuerySchema } from "./schema/price.schema";
import { descriptionQuerySchema } from "./schema/description.schema";

const productRoutes = Router();

productRoutes.post("/product", validateSchema(productSchema), create);
productRoutes.get("/product/:id", getById);
productRoutes.put("/product/:id", validateSchema(productSchema), update);
productRoutes.delete("/product/:id", deleteProductById);
productRoutes.get("/products", listAll);
productRoutes.get(
  "/products/price",
  validateSchema(priceQuerySchema, "query"),
  getProductsAbovePrice,
);
productRoutes.get(
  "/products/description",
  validateSchema(descriptionQuerySchema, "query"),
  getProductsByDescription,
);

export { productRoutes };
