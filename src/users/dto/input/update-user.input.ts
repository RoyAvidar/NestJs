import { Field, InputType } from "@nestjs/graphql";
import { IsAlpha, IsNotEmpty } from "class-validator";

@InputType()
export class UpdateUserInput {

    @Field()
    @IsAlpha()
    @IsNotEmpty()
    userName: string;

    @Field()
    @IsNotEmpty()
    userPhone: string;

}