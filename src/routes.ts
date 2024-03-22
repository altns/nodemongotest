import { Router } from "express";
import { productRoutes } from "./modules/product/product.routes";
import authRoutes from "./modules/auth/auth.routes";
import { authenticate } from "./midlewares/auth";

// adiciona as rotas da api
const router = Router();

//adiciona rotas de autenticação
router.use(authRoutes);

// adiciona midleware de autenticação para todas as rotas abaixo
router.use(authenticate);

// adiciona rotas de produtos
router.use(productRoutes);

export { router };
