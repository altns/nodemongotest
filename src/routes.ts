import { Router } from "express";
import { productRoutes } from "./modules/product/product.routes";

const router = Router();

// adiciona as rotas da api
router.use(productRoutes);

export { router };
