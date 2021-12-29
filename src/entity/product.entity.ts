import { Field, Int, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartProduct } from "./cart-product.entity";
import { Category } from "./category.entity";
import { ProductOrder } from "./product-order.entity";

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

    @OneToMany(type => CartProduct, cartProducts => cartProducts.product)
    @Field(type => CartProduct)
    @JoinColumn({name: 'productId'})
    cartProducts: CartProduct;

    @OneToMany(type => ProductOrder, productOrder => productOrder.product)
    @Field(type => ProductOrder)
    @JoinColumn({name: 'productId'})
    productOrder: ProductOrder;
}