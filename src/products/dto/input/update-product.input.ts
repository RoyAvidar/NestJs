import { Field, InputType, Int } from "@nestjs/graphql";
import { IsAlpha, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class UpdateProductInput {
    @Field()
    @IsNotEmpty()
    productId: string;

    @Field()
    @IsOptional()
    @IsNotEmpty()
    productName: string;

    @Field()
    @IsOptional()
    @IsNotEmpty()
    productDescription: string;

    @Field(type => Int)
    @IsOptional()
    @IsNotEmpty()
    productPrice: number;
}