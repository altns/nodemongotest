import { Request, Response, NextFunction } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listAllProducts,
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
