import { Field, Int, ObjectType } from "@nestjs/graphql";
// import { Category } from "src/entity/category.entity";
import { Order } from "src/entity/order.entity";
import { User } from "src/entity/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
@ObjectType()
export class Product extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    productId: number;

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
    
    @Column()
    @Field(type => Int)
    categoryId: number;

    @ManyToOne(() => User, user => user.products)
    @Field(type => Int)
    userId?: number;
    
    @ManyToOne(() => Order, order => order.productId)
    @Field(type => Int)
    orderId?: number;
}