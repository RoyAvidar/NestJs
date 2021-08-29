import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Product } from "src/entity/product.entity";
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
}