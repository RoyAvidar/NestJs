import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsDate } from "class-validator";
import { Product } from "src/entity/product.entity";
import { User } from "src/entity/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders')
@ObjectType()
export class Order {
    @Field()
    @PrimaryGeneratedColumn()
    orderId: number;
    
    @Column()
    @Field()
    @IsDate()
    createdAt: Date;
    
    @Column()
    @Field(type => Int)
    orderPrice: number;

    @OneToMany(type => Product, product => product.orderId)
    @Field(type => Int)
    productId: number;

    @ManyToOne(type => User, user => user.products)
    @Field(type => Int)
    userId: number;
}