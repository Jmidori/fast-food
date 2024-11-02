import ProductAdapter from "./ProductAdapter";
import CustomerAdapter from "./CustomerAdapter";
import OrderModel from "../infrastructure/database/models/OrderModel";
import {
  Order,
  OrderItem,
  OrderStatus,
  PaymentMethod,
} from "../domain/entities/Order";
import { GetOrderResponse } from "../application/http/responses/OrderResponse";

export default class OrderAdapter {
  customerAdapter: CustomerAdapter;
  productAdapter: ProductAdapter;

  constructor(
    customerAdapter: CustomerAdapter,
    productAdapter: ProductAdapter
  ) {
    this.customerAdapter = customerAdapter;
    this.productAdapter = productAdapter;
  }

  modelToDomain(orderModel: OrderModel): Order {
    const { id, status, order_number, payment_method } = orderModel.dataValues;

    const customer = this.customerAdapter.modelToDomain(
      (orderModel.dataValues as any).customer as any
    );

    const orderItemsModel = (orderModel.dataValues as any).order_items as any[];
    const orderItems = orderItemsModel.map((order_item) => {
      return new OrderItem(
        order_item.id,
        this.productAdapter.modelToDomain((order_item as any).product as any),
        order_item.quantity
      );
    });

    return new Order(
      status as OrderStatus,
      payment_method as PaymentMethod,
      customer,
      orderItems,
      id,
      order_number
    );
  }

  domainToGetOrderResponse(order: Order): GetOrderResponse {
    const { id, status, orderNumber } = order;
    return new GetOrderResponse(id as number, status, orderNumber);
  }
}
