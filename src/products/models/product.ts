import { User } from "src/users/models/user";

export class Product {
    productId: string;
    productName: string;
    productPrice: number;
    user: User;
}