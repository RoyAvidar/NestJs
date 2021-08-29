import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Category } from "src/entity/category.entity";
import { Order } from "src/entity/order.entity";
import { User } from "src/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
@ObjectType()
export class Product {
    @Field()
    @PrimaryGeneratedColumn()
    productId: string;

    @Column()
    @Field()
    productName: string;
  
    @Column()
    @Field(type => Int)
    productPrice: number;

    @Column()
    @Field()
    productDesc: string;
    
    @Column()
    @Field()
    imageUrl: string;

    // @ManyToOne(() => User, user => user.products)
    // @Field(type => User)
    // userId?: string;

    // @ManyToOne(() => Order, order => order.products)
    // @Field(type => Order)
    // orderId?: Order;

    @Column()
    @Field()
    categoryName: string;
}