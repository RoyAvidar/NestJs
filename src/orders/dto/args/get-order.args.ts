import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class GetOrderArgs {
    @Field()
    @IsNotEmpty()
    orderId: number;
}