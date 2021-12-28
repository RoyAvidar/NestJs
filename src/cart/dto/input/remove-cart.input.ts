import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class RemoveFromCartInput {

    @Field(type => Int)
    @IsNotEmpty()
    cartId: number;

    @Field(type => Int)
    @IsNotEmpty()
    productId: number;
}