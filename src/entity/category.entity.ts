import { Field, Int, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
@ObjectType()
export class Category extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    categoryId: string;

    @Column()
    @Field()
    categoryName: string;
}