import { Field, InputType } from "@nestjs/graphql";
import { IsAlpha, IsNotEmpty } from "class-validator";

@InputType()
export class UpdateUserInput {

    @Field()
    @IsAlpha()
    @IsNotEmpty()
    userName: string;

    @Field()
    @IsAlpha()
    @IsNotEmpty()
    userLastName: string;

    @Field()
    @IsNotEmpty()
    userEmail: string;

    @Field()
    @IsNotEmpty()
    userPhone: string;

}