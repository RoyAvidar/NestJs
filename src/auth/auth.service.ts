import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/entity/user.entity';
import { CreateUserInput } from 'src/users/dto/input/create-user.input';
import { UsersService } from 'src/users/users.service';
import { jwtSecret } from './constants';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validate(userName: string, userPassword: string): Promise<User> {
        const user = await this.usersService.getUserByName(userName);
        if (!user) {
            return null;
        }
        //usually compare encrypted pass in db to the pass that is passed in here(bcrypt).
        const passwordIsValid = userPassword === user.userPassword;
        return passwordIsValid ? user : null;
        
    }

    async login(userName: string, userPassword: string) {
        const expireDate = new Date();
        expireDate.setHours(18);
        const user = await this.usersService.getUserByName(userName);
        const payload = {
            id: user.userId,
            sub: userPassword,
            expire: expireDate,
        };
        if (user.userName == userName && user.userPassword == userPassword) {
            const token = this.jwtService.sign(payload);
            return token;
        } else {
            throw new Error('Invalid User Name or User Password');
        }
        
    }

    async verifyToken(token: string): Promise<User> {
        const decoodedPayload = this.jwtService.verify(token, {
            secret: jwtSecret
        })
        //reach out to db to get the user.
        const user = this.usersService.getUserById(decoodedPayload.id);
        if (!user) {
            throw new Error('Unable to get the user from decoded token.');
        }
        return user;
    }

    async signUp(createUserInput: CreateUserInput): Promise<User> {
        const user = await this.usersService.createUser(createUserInput);
        return user;
    }

   async getExpireDate(token: string): Promise<number> {
    const decoodedPayload = await this.jwtService.verify(token, {
        secret: jwtSecret
    })
    if (Date.parse(decoodedPayload.expire) >= Date.now()) {
        return Date.parse(decoodedPayload.expire);
    } else {
        throw new Error('Tokens expirey date is over.')
    }
   }
}
