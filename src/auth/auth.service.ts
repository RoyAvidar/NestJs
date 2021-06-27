import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/user.entity';
import { UsersService } from 'src/users/users.service';
import { jwtSecret } from './constants';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validate(userName: string, userPassword: string): Promise<User> {
        const user = this.usersService.getUserByName(userName);
        if (!user) {
            return null;
        }
        //usually compare encrypted pass in db to the pass that is passed in here(bcrypt).
        const passwordIsValid = userPassword === (await user).userPassword;
        return passwordIsValid ? user : null;
        
    }

    login(user: User): {access_token: string} {
        const payload = {
            name: user.userName,
            sub: user.userId
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async verifyToken(token: string): Promise<User> {
        const decoodedPayload = this.jwtService.verify(token, {
            secret: jwtSecret
        })
        //reach out to db to get the user.
        const user = this.usersService.getUserByName(decoodedPayload.userName);
        if (!user) {
            throw new Error('Unable to get the user from decoded token.');
        }

        return user;
    }
}
