import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";

@Entity('product-orders')
@ObjectType()
export class ProductOrder {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Order, order => order.productOrder)
    @Field(type => Order)
    @JoinColumn({name: 'orderId'})
    order: Order;

    @ManyToOne(type => Product, product => product.productOrder)
    @Field(type => Product)
    @JoinColumn({name: 'productId'})
    product: Product;

    @Column()
    @Field(type => Number)
    quantity: number;
}