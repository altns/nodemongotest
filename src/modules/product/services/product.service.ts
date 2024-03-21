import { Product } from "../repository/product.repository";

const productRepository = new Product();

export const createProduct = (
  name: string,
  price: number,
  description?: string,
) => {
  return productRepository.create(name, price, description);
};

export const getProductById = (id: number) => {
  return productRepository.findById(id);
};

export const updateProduct = (
  id: number,
  name: string,
  price: number,
  description?: string,
) => {
  return productRepository.update(id, name, price, description);
};

export const deleteProduct = (id: number) => {
  return productRepository.delete(id);
};

export const listAllProducts = () => {
  return productRepository.listAll();
};
