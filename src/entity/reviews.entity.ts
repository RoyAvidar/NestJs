import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserReview } from "./user-review.entity";
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

    @Field({nullable: true})
    @Column()
    isLike: number;

    @Field({nullable: true})
    @Column()
    isDislike: number;

    @Field(type => [UserReview])
    @OneToMany(type => UserReview, userReview => userReview.review)
    @JoinColumn({name: 'reviewId'})
    userReview: UserReview[];

    @Field(type => Boolean)
    userDidLikeOrDislike: boolean;

    @Field(type => Boolean)
    whatUserActuallyDid: boolean;
}