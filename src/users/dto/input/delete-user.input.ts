import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class DeleteUserInput {
    @Field(type => Int)
    @IsNotEmpty()
    userId: number;
}