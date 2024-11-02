export class GetOrderResponse {
  id: number;
  status: string;
  orderNumber: string;

  constructor(id: number, status: string, orderNumber: string) {
    this.id = id;
    this.status = status;
    this.orderNumber = orderNumber;
  }
}
