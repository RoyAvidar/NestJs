import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { IsArray, IsNotEmpty } from "class-validator";

@InputType()
export class GetProductsArgs {
    @Field(() => [String], {})
    @IsNotEmpty()
    @IsArray()
    productIds: string[];
}