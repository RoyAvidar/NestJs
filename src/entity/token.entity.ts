import { Field, ObjectType } from "@nestjs/graphql";
import { IsDate } from "class-validator";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('token')
@ObjectType()
export class Token {
    @Field()
    @PrimaryColumn({generated: "uuid"})
    tokenId: string;

    @Column()
    @Field()
    @IsDate()
    expireDate: Date;

    @ManyToOne(type => User, user => user.token)
    @Field(type => User)
    @JoinColumn({ name: 'userId' })
    user: User;
}