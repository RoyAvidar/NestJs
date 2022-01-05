import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('reviews')
@ObjectType()
export class Reviews extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    reviewId: number;

    @Column()
    @Field()
    reviewContent: string;

    @ManyToOne(type => User, user => user.review)
    @Field(type => User)
    @JoinColumn({ name: 'userId' })
    user: User;
}