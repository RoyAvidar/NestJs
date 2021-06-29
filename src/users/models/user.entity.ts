import { Field, ObjectType } from "@nestjs/graphql";
import { Order } from "src/orders/models/order.entity";
import { Product } from "src/products/models/product.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
@ObjectType()
export class User extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    userId: string;

    @Field()
    @Column()
    userName: string;

    @Column()
    userPassword: string;

    @Field()
    @Column()
    userPhone: string;

    @Field({nullable: true})
    @Column({default: false})
    isAdmin: boolean;

    @Field(type => [Product], {nullable: true})
    @OneToMany(type => Product, product => product.user)
    products?: Product[];

    @Field(type => [Order], {nullable: true})
    @OneToMany(type => Order, order => order.user)
    orders?: Order[];
}