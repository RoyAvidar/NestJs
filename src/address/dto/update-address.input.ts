import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class UpdateAddressInput {
    
    @Field()
    @IsNotEmpty()
    city: string;

    @Field()
    @IsNotEmpty()
    streetName: string;

    @Field(type => Int)
    @IsNotEmpty()
    streetNumber: number;

    @Field(type => Int)
    @IsNotEmpty()
    floorNumber: number;

    @Field(type => Int)
    @IsNotEmpty()
    apartmentNumber: number;
}