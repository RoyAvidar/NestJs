import { Post, Req, UseGuards } from "@nestjs/common";
import {Request} from 'express';
import { Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { User } from "src/entity/user.entity";

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    // @UseGuards(LocalAuthGuard) //calls validate in the local strategy.
    @Query(() => String)
    login():string {
        return 'test';//this.authService.login(req.user as User);
    } // written like a regular controller in expressJs.
}