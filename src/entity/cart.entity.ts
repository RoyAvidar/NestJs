import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity('cart')
@ObjectType()
export class Cart {
    @Field()
    @PrimaryGeneratedColumn()
    cartId: number;

    @ManyToOne(type => Product)
    @Field(type => Product)
    @JoinTable({
        name: 'cart-products',
        joinColumn: { name: 'cartId' },
        inverseJoinColumn: {name: 'productId'}
    })
    products: Product;

    @OneToOne(type => User)
    @Field(type => User)
    @JoinColumn({name: 'userId'})
    user: User;

    @Column()
    @Field(type => Int)
    totalPrice: number;
}