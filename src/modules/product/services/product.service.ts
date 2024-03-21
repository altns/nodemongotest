import prisma from "../../../../prisma/prismaConfig";

export const createProduct = async (
  name: string,
  price: number,
  description?: string,
) => {
  return prisma.product.create({
    data: {
      name,
      price,
      description,
    },
  });
};

export const getProductById = (id: string) => {
  return prisma.product.findUnique({
    where: { id },
  });
};

export const updateProduct = (
  id: string,
  name: string,
  price: number,
  description?: string,
) => {
  return prisma.product.update({
    where: { id },
    data: {
      name,
      price,
      description,
    },
  });
};

export const deleteProduct = (id: string) => {
  return prisma.product.delete({
    where: { id },
  });
};

export const listAllProducts = () => {
  return prisma.product.findMany();
};
