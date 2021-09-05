import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateOrderInput {
    @Field()
    @IsNotEmpty()
    createdAt: Date;

    @Field(type => Int)
    @IsNotEmpty()
    orderPrice: number;

    @Field()
    @IsNotEmpty()
    userId: string;

}