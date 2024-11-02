export interface CreateOrderRequest {
  customerId: number;
  products: [
    {
      productId: number;
      quantity: number;
    }
  ];
}

export interface PatchOrderRequest {
  status: string;
}
