import { ArgsType, Field } from "@nestjs/graphql";
import { IsArray } from "class-validator";

@ArgsType()
export class GetProductsArgs {
    @Field()
    @IsArray()
    productId: string[];
}