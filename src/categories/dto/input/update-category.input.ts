import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class UpdateCategoryInput {
    @Field()
    @IsNotEmpty()
    categoryId: string;
    
    @Field()
    @IsNotEmpty()
    categoryName: string;

    @Field()
    @IsNotEmpty()
    categoryIcon: string;
}