import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsAlpha, IsNotEmpty, IsOptional } from "class-validator";
import { Order } from "src/entity/order.entity";
import { Product } from "src/entity/product.entity";

@InputType()
export class CreateUserInput {
    @Field()
    @IsAlpha()
    @IsNotEmpty()
    userName: string;

    @Field()
    @IsNotEmpty()
    userPassword: string;

    @Field()
    @IsNotEmpty()
    userPhone: string;

    @Field()
    @IsNotEmpty()
    isAdmin: boolean;
    
    @Field(type => [Product], {nullable: true})
    @IsOptional()
    products?: Product[];

    @Field(type => [Order], {nullable: true})
    @IsOptional()
    orders?: Order[];
}