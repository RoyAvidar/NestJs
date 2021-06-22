import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetOrderArgs {
    @Field()
    @IsNotEmpty()
    orderId: string;
}