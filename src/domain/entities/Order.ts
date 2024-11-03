import { generateRandomString } from "../../infrastructure/generators";
import Customer from "./Customer";
import { Product } from "./Product";

export class Order {
  id: number | null;
  status: OrderStatus;
  orderNumber: string;
  paymentMethod: PaymentMethod;

  total: number;

  customer: Customer | null;

  orderItems: OrderItem[];

  constructor(
    status: OrderStatus,
    paymentMethod: PaymentMethod,
    customer: Customer | null,
    orderItems: OrderItem[],
    id: number | null = null,
    orderNumber: string | null = null
  ) {
    this.id = id;
    this.orderNumber = orderNumber ?? generateRandomString(5);
    this.status = status;
    this.paymentMethod = paymentMethod;
    this.customer = customer;
    this.orderItems = orderItems;

    this.total = this.orderItems.reduce(
      (accumulator, currentValue) => accumulator + currentValue.total,
      0
    );
  }
}

export class OrderItem {
  id: number | null;
  product: Product;
  quantity: number;
  total: number;

  constructor(id: number | null, product: Product, quantity: number) {
    this.id = id;
    this.product = product;
    this.quantity = quantity;

    this.total = this.product.price * this.quantity;
  }
}

export enum OrderStatus {
  Recebido = "recebido",
  EmPreparacao = "em_preparacao",
  Pronto = "pronto",
  Finalizado = "finalizado",
}

export enum PaymentMethod {
  QRCODE = "QRCODE",
}
