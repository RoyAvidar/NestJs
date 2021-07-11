import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Product } from "src/products/models/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
@ObjectType()
export class Category {
    @Field()
    @PrimaryGeneratedColumn()
    categoryId: string;

    @Column()
    @Field()
    categoryName: string;

    @Field(type => [Product], {nullable: true})
    @OneToMany(type => Product, product => product.category)
    products: Product[];
}