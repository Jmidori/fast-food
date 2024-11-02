export enum Category {
    BURGER = "lanche",
    SIDE = "acompanhamento",
    BEVERAGE = "bebida",
    DESSERT = "sobremesa",
    OTHERS = "outros"
}

// export function getCategoryByValue(value: string): Category | null {
//     const key = Object.keys(Category).find(key => Category[key as keyof typeof Category] === value);
//     return key ? Category[key as keyof typeof Category] : null;
// }

export class Product {
    id: number | null;
    name: string;
    category: Category;
    price: number;
    description: string | null;
    available: boolean;
    image: Buffer | null;

    constructor(
        id: number | null,
        name: string,
        category: Category,
        price: number,
        description: string | null,
        available: boolean,
        image: Buffer | null) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.description = description;
        this.available = available;
        this.image = image;
    }

}