import { Op } from "sequelize";
import ProductModel from "../models/ProductModel";
import { Product } from "../../../domain/entities/Product";
import ProductAdapter from "../../../adapters/ProductAdapter";
import IProductRepository from "../../../domain/interfaces/IProductRepository";

export default class ProductRepository implements IProductRepository {
  productAdapter: ProductAdapter;

  constructor(productAdapter: ProductAdapter) {
    this.productAdapter = productAdapter;
  }

  async findById(id: number): Promise<Product | null> {
    const productModel = await ProductModel.findOne({
      where: {
        id: id,
        deletedAt: { [Op.is]: null },
      },
    });
    if (productModel) {
      return this.productAdapter.modelToDomain(productModel);
    }
    return null;
  }

  async findAllByIds(productsId: number[]): Promise<Product[]> {
    const productsModel = await ProductModel.findAll({
      where: {
        id: { [Op.in]: productsId },
        deletedAt: { [Op.is]: null },
      },
    });

    return this.productAdapter.modelArrayToDomainArray(productsModel);
  }

  async findByCategory(category: string): Promise<Product[]> {
    const productsModel = await ProductModel.findAll({
      where: {
        category: category,
        deletedAt: { [Op.is]: null },
      },
    });
    return this.productAdapter.modelArrayToDomainArray(productsModel);
  }

  async create(product: Product): Promise<Product> {
    const { name, category, price, description, available, image } = product;
    const productModel = await ProductModel.create({
      name: name,
      category: category,
      price: price,
      description: description,
      available: available,
      image: image,
      deletedAt: null,
    });

    return this.productAdapter.modelToDomain(productModel);
  }

  async update(product: Product): Promise<Product | null> {
    const { id, name, category, price, description, available, image } = product;
    console.log(product);
    await ProductModel.update(
      {
        name,
        category,
        price,
        description,
        available,
        image,
      },
      {
        where: {
          id: id as number,
        },
      }
    );

    return this.findById(id as number);
  }

  async delete(id: number): Promise<void> {
    await ProductModel.update(
      {
        deletedAt: new Date(),
      },
      {
        where: {
          id: id as number,
        },
      }
    );
  }
}
