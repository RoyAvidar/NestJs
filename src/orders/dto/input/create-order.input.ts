import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { Product } from "src/entity/product.entity";

@InputType()
export class CreateOrderInput {
    @Field()
    @IsNotEmpty()
    createdAt: Date;

    @Field(type => Int)
    @IsNotEmpty()
    orderPrice: number;

    @Field(type => Int)
    @IsNotEmpty()
    userId: number;

    // @Field(type => [Product], {nullable: true})
    // @IsNotEmpty()
    // products: Product[];
}