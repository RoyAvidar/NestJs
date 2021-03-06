import { Field, InputType, Int } from "@nestjs/graphql";
import { IsAlpha, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class UpdateProductInput {

    @Field()
    @IsNotEmpty()
    @IsAlpha() //validator.
    productName: string;

    @Field(type => Int)
    @IsNotEmpty()
    productPrice: number;

    @Field()
    @IsNotEmpty()
    productDesc: string;

    @Field()
    @IsNotEmpty()
    imageUrl: string;

    @Field(type => Int)
    @IsNotEmpty()
    categoryId: number;
}