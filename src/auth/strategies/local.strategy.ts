import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/entity/user.entity";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor (private authService: AuthService) {
        super({ usernameField: 'userName'});
    }

    async validate(userName: string, userPassword: string): Promise<User> {
        //reach out to db to get the user.
        const user = await this.authService.validate(userName, userPassword);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}