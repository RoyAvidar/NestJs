import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

export class DeleteProductInput {
    @Field()
    @IsNotEmpty()
    productId: string;
}