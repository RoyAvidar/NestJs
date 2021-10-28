import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateOrderInput {
    // @Field()
    // @IsNotEmpty()
    // createdAt: Date;
    @Field(type => Int)
    @IsNotEmpty()
    cartId: number;

    @Field(type => Int)
    @IsNotEmpty()
    userId: number;

}