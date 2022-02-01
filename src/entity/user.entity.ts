import { Field, ObjectType } from "@nestjs/graphql";
import { Order } from "src/entity/order.entity";
import { Product } from "src/entity/product.entity";
import { Token } from "src/entity/token.entity";
import { BaseEntity, BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";
import * as bcrypt from 'bcrypt';
import { Reviews } from "./reviews.entity";
import { UserReview } from "./user-review.entity";

@Entity('users')
@ObjectType()
export class User extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    userId: number;

    @Field()
    @Column()
    userName: string;
    
    @Column()
    userPassword: string;

    @Field()
    @Column()
    userPhone: string;

    @Field({nullable: true})
    @Column()
    userProfilePic: string;

    @Field({nullable: true})
    @Column({default: false})
    isAdmin: boolean;

    @Field({nullable: true})
    @Column({default: false})
    isDarkMode: boolean;

    @Field(type => [Product], {nullable: true})
    @ManyToMany(type => Product)
    @JoinTable({
        name: 'user-products',
        joinColumn: { name: 'userId' },
        inverseJoinColumn: {name: 'productId'}
    })
    products?: Product[];

    @Field(type => [Order], {nullable: true})
    @OneToMany(type => Order, order => order.user)
    orders?: Order[];

    @OneToOne(type => Cart, Cart => Cart.user)
    @Field(type => Cart)
    cart?: Cart;

    @Field(type => Token)
    @OneToMany(type => Token, token => token.user)
    token: Token;

    @Field(type => Reviews)
    @OneToMany(type => Reviews, review => review.user)
    review: Reviews

    @Field(type => UserReview)
    @OneToMany(type => UserReview, uesrReview => uesrReview.user)
    @JoinColumn({name: 'userId'})
    userReview: UserReview;

    @BeforeInsert()
    async hashPassword() {
        const saltOrrounds = 10;
        this.userPassword = await bcrypt.hash(this.userPassword, saltOrrounds);
    }
}