import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class DeleteProductInput {
    @Field()
    @IsNotEmpty()
    productId: number;
}