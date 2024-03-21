import { Router } from "express";
import { productRoutes } from "./modules/product/product.routes";

// adiciona as rotas da api
const router = Router();

// adiciona rotas de produtos
router.use(productRoutes);

export { router };
