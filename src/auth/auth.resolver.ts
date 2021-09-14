import { Get, Request, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { User } from "src/entity/user.entity";
import { CreateUserInput } from "src/users/dto/input/create-user.input";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    // @UseGuards(JwtAuthGuard)
    @Mutation(() => String)
    async login(@Args('userName')userName: string, @Args('userPassword')userPassword: string) {
        return this.authService.login(userName, userPassword);
    }  //written like a regular controller in expressJs.

    @Mutation(() => User)
    signUp(@Args('createUserData') createUserData: CreateUserInput) {
        return this.authService.signUp(createUserData);
    }

    @Query(() => User)
    validate(@Args('userName') userName: string, @Args('userPassword') userPassword: string) {
        return this.authService.validate(userName, userPassword);
    }

    @Query(() => User)
    verifyToken(@Args('token') token: string) {
        return this.authService.verifyToken(token);
    }
}