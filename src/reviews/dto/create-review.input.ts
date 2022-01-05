import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateReviewInput {
    @Field()
    @IsNotEmpty()
    reviewContent: string;
}