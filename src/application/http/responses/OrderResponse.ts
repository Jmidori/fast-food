export class GetOrderResponse {
  id: number;
  status: string;
  orderNumber: string;
  executionTimeInMs: number;

  constructor(id: number, status: string, orderNumber: string, executionTimeInMs: number) {
    this.id = id;
    this.status = status;
    this.orderNumber = orderNumber;
    this.executionTimeInMs = executionTimeInMs;
  }
}
