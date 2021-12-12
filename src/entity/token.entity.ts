import { Field, ObjectType } from "@nestjs/graphql";
import { IsDate } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('token')
@ObjectType()
export class Token {
    @Field()
    @PrimaryGeneratedColumn()
    tokenId: number;

    @Column()
    @Field()
    tokenString: string;

    @Column()
    @Field()
    @IsDate()
    expireDate: Date;

    @ManyToOne(type => User, user => user.token)
    @Field(type => User)
    @JoinColumn({ name: 'userId' })
    user: User;
}