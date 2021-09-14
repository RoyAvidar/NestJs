import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/entity/user.entity";
import { UsersService } from "src/users/users.service";
import { jwtSecret } from "../constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, //do not ignore the expiration date on the jwt.
            secretOrKey: jwtSecret
        });
    }

    async validate(validationPayload: {name: string, sub: string}): Promise<User> {
        return await this.usersService.getUserByName(validationPayload.name);
    }

    //  we could do a database lookup in our validate() method to extract more information about the user,
    // resulting in a more enriched user object being available in our Request.
}