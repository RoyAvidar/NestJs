import { Field, InputType, Int } from "@nestjs/graphql";
import { IsAlpha, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class CreateProductInput {

    @Field()
    @IsNotEmpty()
    @IsAlpha()
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

    @Field(type => Int ,{nullable: true})
    @IsNotEmpty()
    categoryId?: number;

    @Field({nullable: true})
    @IsNotEmpty()
    @IsOptional()
    userId?: string;  
}