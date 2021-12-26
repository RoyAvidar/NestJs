import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartProduct } from "./cart-product.entity";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity('cart')
@ObjectType()
export class Cart {
    @Field()
    @PrimaryGeneratedColumn()
    cartId: number;

    @ManyToMany(type => Product)
    @Field(type => [Product])
    @JoinTable({
        name: 'cart-products',
        joinColumn: { name: 'cartId' },
        inverseJoinColumn: {name: 'productId'}
    })
    products: Product[];

    @OneToOne(type => User)
    @Field(type => User)
    @JoinColumn({name: 'userId'})
    user: User;

    @Column()
    @Field(type => Int)
    totalPrice: number;

    @Column()
    @Field(type => Int)
    itemCount: number;

    @OneToMany(type => CartProduct, cartProducts => cartProducts.cart)
    @Field(type => [CartProduct])
    @JoinColumn({name: 'cartId'})
    cartProducts: CartProduct[]
}