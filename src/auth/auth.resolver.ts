import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { User } from "src/entity/user.entity";
import { Token } from "src/entity/token.entity";
import { CreateUserInput } from "src/users/dto/input/create-user.input";
import { GqlAuthGuard } from "./guards/gql-auth.guard";
import { GQLCURRENTTOKEN, GQLCURRENTUSER } from "src/decorators/user.decorator";
import { UseGuards } from "@nestjs/common";

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    // @UseGuards(JwtAuthGuard)
    @Mutation(() => String)
    async login(@Args('userName') userName: string, @Args('userPassword') userPassword: string) {
        return this.authService.login(userName, userPassword);
    }  //written like a regular controller in expressJs.

    @Mutation(() => User)
    signUp(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.authService.signUp(createUserInput);
    }

    @Query(() => User)
    validate(@Args('userName') userName: string, @Args('userPassword') userPassword: string) {
        return this.authService.validate(userName, userPassword);
    }

    @Query(() => User)
    verifyToken(@Args('token') token: string) {
        return this.authService.verifyToken(token);
    }

    @Query(() => Number)
    getExpireDate(@Args('token') token: string) {
        return this.authService.getExpireDate(token);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    logout(@GQLCURRENTUSER() user, @GQLCURRENTTOKEN() token) {
        return this.authService.logout(user, token);
    }

    // @Query (() => User)
    // getUser(@Args('userId') userId: string) {
    //     return this.authService.getUser(userId);
    // }
}