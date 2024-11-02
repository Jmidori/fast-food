export class GetProductResponse {
    id: number;
    name: string;
    category: string;
    price: number;
    description: string | null;
    available: boolean;
    image: Buffer | null;
    constructor(
        id: number,
        name: string,
        category: string,
        price: number,
        description: string | null,
        available: boolean,
        image: Buffer | null) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.description = description === null ? null : description;
        this.available = available;
        this.image = image !== null ? image : null;
    }
}