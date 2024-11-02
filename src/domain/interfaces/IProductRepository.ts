import { Product } from "../entities/Product";

export default interface IProductRepository {
  findById(id: number): Promise<Product | null>;
  findAllByIds(productsId: number[]): Promise<Product[]>;
  findByCategory(category: string): Promise<Product[]>;
  create(product: Product): Promise<Product>;
  update(order: Product): Promise<Product | null>;
  delete(id: number): Promise<void>;
}
