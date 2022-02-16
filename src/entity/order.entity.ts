import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsDate } from "class-validator";
import { Product } from "src/entity/product.entity";
import { User } from "src/entity/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductOrder } from "./product-order.entity";

@Entity('orders')
@ObjectType()
export class Order extends BaseEntity{
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

    @Column({default: false})
    @Field(type => Boolean)
    isReady: boolean;

    @Column()
    @Field()
    address: string;

    @ManyToOne(type => User, user => user.products)
    @Field(type => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @OneToMany(type => ProductOrder, productOrder => productOrder.order)
    @Field(type => [ProductOrder])
    @JoinColumn({name: 'orderId'})
    productOrder: ProductOrder[];
}