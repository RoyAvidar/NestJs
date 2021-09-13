import { Post, Req, Request, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { User } from "src/entity/user.entity";
import { CreateUserInput } from "src/users/dto/input/create-user.input";

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard) //calls validate in the local strategy.
    @Mutation(() => String)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }  //written like a regular controller in expressJs.

    @Mutation(() => User)
    signUp(@Args('createUserData') createUserData: CreateUserInput) {
        return this.authService.signUp(createUserData);
    }
}