import { Field, Int, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('address')
@ObjectType()
export class Address extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    addressId: number;

    @Field()
    @Column()
    city: string;

    @Field()
    @Column()
    streetName: string;

    @Field(type => Int)
    @Column()
    streetNumber: number;

    @Field(type => Int)
    @Column()
    floorNumber: number;

    @Field(type => Int)
    @Column()
    apartmentNumber: number;
    
    @Field(type => User)
    @ManyToOne(type => User, user => user.address, {onDelete: "CASCADE"})
    @JoinColumn({ name: 'userId' })
    user: User;
}