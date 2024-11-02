export interface CreateProductRequest {
  name: string;
  category: string;
  price: number;
  description?: string;
  available?: boolean;
  image?: Buffer;
}

export interface PatchProductRequest {
  name?: string;
  category?: string;
  price?: number;
  description?: string;
  available?: boolean;
  image?: Buffer;
}
