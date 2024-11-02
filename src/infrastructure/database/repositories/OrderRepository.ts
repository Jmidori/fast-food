import OrderModel from "../models/OrderModel";
import ProductModel from "../models/ProductModel";
import CustomerModel from "../models/CustomerModel";
import OrderItemModel from "../models/OrderItemModel";
import { Order, OrderStatus } from "../../../domain/entities/Order";
import OrderAdapter from "../../../adapters/OrderAdapter";
import IOrderRepository from "../../../domain/interfaces/IOrderRepository";
import { Op } from "sequelize";

export default class OrderRepository implements IOrderRepository {
  orderAdapter: OrderAdapter;

  associations = [
    {
      model: CustomerModel,
      as: "customer",
    },
    {
      model: OrderItemModel,
      as: "order_items",
      include: [
        {
          model: ProductModel,
          as: "product",
        },
      ],
    },
  ];

  constructor(orderAdapter: OrderAdapter) {
    this.orderAdapter = orderAdapter;
  }

  async findById(id: number): Promise<Order | null> {
    const orderModel = await OrderModel.findByPk(id, {
      include: this.associations,
    });

    if (orderModel) {
      return this.orderAdapter.modelToDomain(orderModel as OrderModel);
    }

    return null;
  }

  async findAllByStatus(status: OrderStatus[]): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll({
      where: { status: { [Op.in]: status } },
      include: this.associations,
    });

    return ordersModel.map((orderModel) =>
      this.orderAdapter.modelToDomain(orderModel)
    );
  }

  async create(order: Order): Promise<Order | null> {
    const orderModel = await OrderModel.create({
      customer_id: order.customer.id as number,
      status: order.status,
      total: order.total,
      order_number: order.orderNumber,
      payment_method: order.paymentMethod,
    });

    const orderItemsModelShadowCopy = order.orderItems.map((orderItem) => {
      return {
        order_id: orderModel.dataValues.id,
        product_id: orderItem.product.id as number,
        quantity: orderItem.quantity,
        unit_price: orderItem.product.price,
      };
    });

    await OrderItemModel.bulkCreate(orderItemsModelShadowCopy);

    return this.findById(orderModel.dataValues.id);
  }

  async update(order: Order): Promise<Order | null> {
    const { id } = order;
    await OrderModel.update(
      {
        status: order.status,
      },
      {
        where: {
          id: id as number,
        },
      }
    );

    return this.findById(id as number);
  }
}
