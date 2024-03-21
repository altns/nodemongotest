import { Request, Response, NextFunction } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listAllProducts,
  updateProduct,
} from "../services/product.service";
import { HttpError } from "../../../midlewares/errorHandling";

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
    next(new HttpError(500, "An error occurred"));
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const product = await getProductById(Number(id));
    if (product) {
      res.json(product);
    } else {
      next(new HttpError(404, "Product not found"));
    }
  } catch (error) {
    next(new HttpError(500, "An error occurred"));
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
    const updatedProduct = await updateProduct(
      Number(id),
      name,
      price,
      description,
    );
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      next(new HttpError(404, "Product not found"));
    }
  } catch (error) {
    next(new HttpError(500, "An error occurred"));
  }
};

export const deleteProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const isDeleted = await deleteProduct(Number(id));
    if (isDeleted) {
      res.status(204).send();
    } else {
      next(new HttpError(404, "Product not found"));
    }
  } catch (error) {
    next(new HttpError(500, "An error occurred"));
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
    next(new HttpError(500, "An error occurred"));
  }
};
