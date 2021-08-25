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
    orderId: string;

    @Column()
    @Field()
    productId: string;

    @Field(type => [Product], {nullable: true})
    @OneToMany(type => Product, product => product.order)
    products: Product[];

    @Column()
    @Field()
    @IsDate()
    createdAt: Date;

    @Column()
    @Field(type => Int)
    orderPrice: number;

    @Column()
    @Field()
    userId: string;

    @ManyToOne(() => User, user => user.products)
    @Field(type => User)
    user: User;
}