import { Order, OrderStatus } from "../entities/Order";

export default interface IOrderRepository {
  findById(id: number): Promise<Order | null>;
  findAllByStatus(status: OrderStatus[]): Promise<Order[]>;
  create(order: Order): Promise<Order | null>;
  update(order: Order): Promise<Order | null>;
}
