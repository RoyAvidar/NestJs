import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class UpdateUserInput {
    @Field()
    @IsNotEmpty()
    userId: string;

    @Field()
    @IsOptional()
    @IsNotEmpty()
    name: string;

    @Field()
    @IsOptional()
    @IsNotEmpty()
    phoneNumber: string;

    @Field()
    @IsOptional()
    @IsNotEmpty()
    password: string;
}