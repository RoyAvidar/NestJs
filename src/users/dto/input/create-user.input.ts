import { Field, InputType } from "@nestjs/graphql";
import { IsAlpha, IsNotEmpty, IsOptional } from "class-validator";
import { Product } from "src/products/models/product.entity";

@InputType()
export class CreateUserInput {
    @Field()
    @IsNotEmpty()
    @IsAlpha()
    userName: string;

    @Field()
    @IsNotEmpty()
    userPassword: string;

    @Field()
    @IsNotEmpty()
    userPhone: string;

    @Field()
    @IsNotEmpty()
    @IsOptional()
    isAdmin?: boolean;

    @Field()
    @IsOptional()
    products: Product[] = [];
}