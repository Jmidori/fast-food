import { OrderItem } from "../domain/entities/Order";
import { Product } from "../domain/entities/Product";
import { CreateOrderRequest } from "../application/http/requests/OrderRequest";

export default class OrderItemsBuilder {
  buildForCreate(
    createOrderRequest: CreateOrderRequest,
    products: Product[]
  ): OrderItem[] {
    const productsIdQuantitiesMap = new Map(
      createOrderRequest.products.map((product) => [
        product.productId,
        product.quantity,
      ])
    );

    return products.map(
      (product) =>
        new OrderItem(
          null,
          product,
          productsIdQuantitiesMap.get(product.id as number) as number
        )
    );
  }
}
