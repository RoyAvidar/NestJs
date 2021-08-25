import { Post, Req, UseGuards } from "@nestjs/common";
import {Request} from 'express';
import { Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { User } from "src/entity/user.entity";

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard) //calls validate in the local strategy.
    @Post('login')
    login(@Req() req: Request): {access_token: string} {
        return this.authService.login(req.user as User);
    } // written like a regular controller in expressJs.
}