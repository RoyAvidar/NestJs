import { Post, Req, UseGuards } from "@nestjs/common";
import {Request} from 'express';
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { User } from "src/entity/user.entity";
import { CreateUserInput } from "src/users/dto/input/create-user.input";

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    // @UseGuards(LocalAuthGuard) //calls validate in the local strategy.
    @Query(() => String)
    login(user: User): string {
        const token = this.authService.login(user as User);
        return token.access_token;
    }  //written like a regular controller in expressJs.

    @Mutation(() => User)
    signUp(@Args('createUserData') createUserData: CreateUserInput) {
        return this.authService.signUp(createUserData);
    }
}