import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/models/user.entity";
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
    @Field()
    productDescription: string;

    @Column()
    @Field(type => Int)
    productPrice: number;

    @Column()
    @Field()
    userId: string;
    
    @ManyToOne(() => User, user => user.products)
    @Field(type => User)
    user: User;
}