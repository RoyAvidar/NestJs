import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Token } from "src/entity/token.entity";
import { User } from "src/entity/user.entity";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import { jwtSecret } from "../constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(@InjectRepository(Token)
        private readonly tokenRepo: Repository<Token>,
        private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, //do not ignore the expiration date on the jwt.
            secretOrKey: jwtSecret,
        });
    }

    async validate(validationPayload: {token: string}) {
        // console.log(validationPayload);
        const token = await this.tokenRepo.findOne(validationPayload.token, {relations: ["user"]});
        return {user: token.user, token: token.tokenId};
    }

    //  we could do a database lookup in our validate() method to extract more information about the user,
    // resulting in a more enriched user object being available in our Request.
}