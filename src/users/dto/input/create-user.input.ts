import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsAlpha, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class CreateUserInput {
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
    userPassword: string;

    @Field()
    @IsNotEmpty()
    userPhone: string;

    @Field()
    @IsNotEmpty()
    isAdmin: boolean;
    
    // @Field(type => [Product], {nullable: true})
    // @IsOptional()
    // products?: Product[];

    // @Field(type => [Order], {nullable: true})
    // @IsOptional()
    // orders?: Order[];
}