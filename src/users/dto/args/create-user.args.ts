import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class CreateUserArgs {
    @Field()
    @IsNotEmpty()
    userId: string;
}