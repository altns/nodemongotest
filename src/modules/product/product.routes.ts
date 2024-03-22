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
import { validateSchema } from "../../middlewares/validateSchema";
import { productSchema } from "./schema/product.schema";
import { priceQuerySchema } from "./schema/price.schema";
import { descriptionQuerySchema } from "./schema/description.schema";
import { requireRole } from "@/middlewares/permission";

const productRoutes = Router();

productRoutes.post(
  "/product",
  requireRole("ADM"),
  validateSchema(productSchema),
  create,
);
productRoutes.get("/product/:id", requireRole("USER"), getById);

productRoutes.put(
  "/product/:id",
  requireRole("ADM"),
  validateSchema(productSchema),
  update,
);

productRoutes.delete("/product/:id", requireRole("ADM"), deleteProductById);

productRoutes.get("/products", requireRole("USER"), listAll);

productRoutes.get(
  "/products/price",
  requireRole("USER"),
  validateSchema(priceQuerySchema, "query"),
  getProductsAbovePrice,
);

productRoutes.get(
  "/products/description",
  requireRole("USER"),
  validateSchema(descriptionQuerySchema, "query"),
  getProductsByDescription,
);

export { productRoutes };
