import { Field, Int, ObjectType } from "@nestjs/graphql";
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