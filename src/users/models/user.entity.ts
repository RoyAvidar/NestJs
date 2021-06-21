import { Field, ObjectType } from "@nestjs/graphql";
import { Product } from "src/products/models/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
@ObjectType()
export class User {
    @Field()
    @PrimaryGeneratedColumn()
    userId: string;

    @Field()
    @Column()
    userName: string;

    @Field()
    @Column()
    userPassword: string;

    @Field()
    @Column()
    userPhone: string;

    @Field()
    @Column({default: false})
    isAdmin: boolean;

    @Field(type => [Product], {nullable: true})
    @OneToMany(type => Product, product => product.user)
    products?: Product[];
}