import { Request, Response, NextFunction } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listAllProducts,
  listProductsAbovePrice,
  listProductsByDescription,
  updateProduct,
} from "../services/product.service";
import { HttpError } from "../../../midlewares/errorHandling";
import { handlePrismaError } from "../../../utils/handlePrismaError";

/**
 * Acabei por passar mais tempo do que gostaria nessa parte do código,
 * havia me esquecido que eu precisava de um midleware para tratar os
 * erros no express e retornar um json com a mensagem de erro.
 */
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, price, description } = req.body;
  try {
    const newProduct = await createProduct(name, price, description);
    res.status(201).json(newProduct);
  } catch (error) {
    next(handlePrismaError(error));
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    if (!product) {
      return next(new HttpError(404, "Product not found"));
    }
    res.json(product);
  } catch (error) {
    next(handlePrismaError(error));
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  try {
    const updatedProduct = await updateProduct(id, name, price, description);
    if (!updatedProduct) {
      return next(new HttpError(404, "Product not found"));
    }
    res.json(updatedProduct);
  } catch (error) {
    next(handlePrismaError(error));
  }
};

export const deleteProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const isDeleted = await deleteProduct(id);
    if (!isDeleted) {
      return next(new HttpError(404, "Product not found"));
    }
    res.status(200).json({ message: `Product ${id} deleted` });
  } catch (error) {
    next(handlePrismaError(error));
  }
};

export const listAll = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await listAllProducts();
    res.json(products);
  } catch (error) {
    next(handlePrismaError(error));
  }
};

// essas duas são funções que utilizam query params
// exemplo de uso: /products/price?price=10
export const getProductsAbovePrice = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const price = parseFloat(req.query.price as string);
    const products = await listProductsAbovePrice(price);
    res.json(products);
  } catch (error) {
    next(handlePrismaError(error));
  }
};

// exemplo de uso: /products/description?keyword=produto
export const getProductsByDescription = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const keyword = req.query.keyword as string;
    const products = await listProductsByDescription(keyword);
    res.json(products);
  } catch (error) {
    next(handlePrismaError(error));
  }
};
