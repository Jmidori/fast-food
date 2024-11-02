import { Category, Product } from "../domain/entities/Product";
import ProductModel from "../infrastructure/database/models/ProductModel";
import { GetProductResponse } from "../application/http/responses/ProductResponse";
import {
  CreateProductRequest,
  PatchProductRequest,
} from "../application/http/requests/ProductRequest";

export default class ProductAdapter {
  domainToGetProductResponse(product: Product): GetProductResponse {
    const { id, name, category, price, description, available, image } =
      product;
    return new GetProductResponse(
      id as number,
      name,
      category,
      price,
      description,
      available,
      image as Buffer
    );
  }

  domainArrayToGetProductArrayResponse(
    products: Product[]
  ): GetProductResponse[] {
    return products.map((product) => this.domainToGetProductResponse(product));
  }

  modelToDomain(productModel: ProductModel): Product {
    const { id, name, category, price, description, available, image } =
      productModel.dataValues;
    return new Product(
      id,
      name,
      category as Category,
      price,
      description,
      available,
      image
    );
  }

  modelArrayToDomainArray(productModels: ProductModel[]): Product[] {
    return productModels.map((productModel) =>
      this.modelToDomain(productModel)
    );
  }

  createProductRequestToDomain(productRequest: CreateProductRequest): Product {
    const { name, category, price, description, available, image } =
      productRequest;
    const descriptionDomain = description === undefined ? null : description;
    const availableDomain = available === undefined ? false : available;
    const imageDomain = image === undefined ? null : image;
    return new Product(
      null,
      name,
      category as Category,
      price,
      descriptionDomain,
      availableDomain,
      imageDomain
    );
  }

  patchProductWithRequest(
    product: Product,
    patchProductRequest: PatchProductRequest
  ): Product {
    const { name, category, price, description, available, image } =
      patchProductRequest;

    product.name = name ?? product.name;
    product.category = (category as Category) ?? product.category;
    product.price = price ?? product.price;
    product.description = description ?? product.description;
    product.available = available ?? product.available;
    product.image = image ?? product.image;

    return product;
  }
}
