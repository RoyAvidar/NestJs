import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { Product } from "./product.entity";

@Entity('cart-products')
@ObjectType()
export class CartProduct {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Cart)
    @Field(type => Cart)
    @JoinColumn({name: 'cartId'})
    cart: Cart;

    @ManyToOne(type => Product)
    @Field(type => [Product])
    @JoinColumn({name: 'productId'})
    products: Product[];

    @Column()
    @Field(type => Number)
    quantity: number;
}