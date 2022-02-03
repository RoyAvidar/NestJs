import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reviews } from "./reviews.entity";
import { User } from "./user.entity";

@Entity('user-review')
@ObjectType()
export class UserReview {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field(type => User)
    @ManyToOne(type => User, user => user.userReview)
    @JoinColumn({name: 'userId'})
    user: User;

    @Field(type => Reviews)
    @ManyToOne(type => Reviews, review => review.userReview)
    @JoinColumn({name: 'reviewId'})
    review: Reviews;

    @Field({nullable: true})
    @Column()
    likeDislike: Boolean;
}