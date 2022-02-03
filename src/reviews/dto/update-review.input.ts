import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class UpdateReviewInput {
    @Field()
    @IsNotEmpty()
    reviewId: number;

    @Field()
    @IsNotEmpty()
    reviewContent: string;
}