import { Field, InputType } from "@nestjs/graphql";
import { IsAlpha, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class UpdateUserInput {

    @Field()
    @IsAlpha()
    @IsNotEmpty()
    userName: string;

    @Field()
    @IsNotEmpty()
    userPhone: string;

    @Field()
    @IsNotEmpty()
    userPassword: string;

    @Field()
    @IsNotEmpty()
    @IsOptional()
    isAdmin: boolean;
}