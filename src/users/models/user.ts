import { Product } from "src/products/models/product";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: string;

    @Column()
    userName: string;

    @Column()
    userPassword: string;

    @Column()
    userPhone: string;

    @Column({default: false})
    isAdmin: boolean;

    @OneToMany(type => Product, product => product.user)
    products: Product[];
}