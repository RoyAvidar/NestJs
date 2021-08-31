import { ArgsType, Field } from "@nestjs/graphql";
import { IsArray, IsNotEmpty } from "class-validator";

@ArgsType()
export class GetOrdersArgs {
    @Field()
    @IsArray()
    @IsNotEmpty()
    orderId: string[];
}