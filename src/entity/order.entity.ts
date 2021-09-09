import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsDate } from "class-validator";
import { Product } from "src/entity/product.entity";
import { User } from "src/entity/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToMany(type => Product)
    @Field(type => Product)
    @JoinTable({
        name: 'product-orders',
        joinColumn: { name: 'orderId' },
        inverseJoinColumn: {name: 'productId'}
    })
    products: Product;

    @ManyToOne(type => User, user => user.products)
    @Field(type => User)
    @JoinColumn({ name: 'userId' })
    user: User;
}