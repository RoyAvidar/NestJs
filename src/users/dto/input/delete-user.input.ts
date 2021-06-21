import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

export class DeleteUserInput {
    @Field()
    @IsNotEmpty()
    userId: string;
}