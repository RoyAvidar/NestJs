import { Field, Int, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";

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
    
    @ManyToOne(type => Category)
    @Field(type => Category)
    @JoinColumn({ name: 'categoryId' })
    category: Category;
}