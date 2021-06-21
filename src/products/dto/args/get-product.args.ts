import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetProductArgs {
    @Field()
    @IsNotEmpty()
    productId: string;
}