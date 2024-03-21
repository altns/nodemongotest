import { IProduct } from "../model/product.model";

/**
 * Classe que representa o repositório de produtos
 * criando, listando, atualizando e deletando produtos
 * totalmente ficticio, apenas para simular um banco de dados
 */

export class Product {
  private products: IProduct[] = [];
  private nextId: number = 1;

  create(name: string, price: number, description?: string): IProduct {
    const newProduct: IProduct = {
      id: this.nextId++,
      name,
      price,
      description,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  findById(id: number): IProduct | undefined {
    return this.products.find((product) => product.id === id);
  }

  update(
    id: number,
    name: string,
    price: number,
    description?: string,
  ): IProduct | null {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      return product;
    }
    return null;
  }

  delete(id: number): boolean {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return true;
    }
    return false;
  }

  listAll(): IProduct[] {
    return this.products;
  }
}
