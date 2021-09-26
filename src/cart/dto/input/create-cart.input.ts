import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateCartInput {

    @Field(type => Int)
    @IsNotEmpty()
    userId: number;

    @Field(type => Int)
    @IsNotEmpty()
    totalPrice: number;
}