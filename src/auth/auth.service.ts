import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/entity/user.entity';
import { Token } from 'src/entity/token.entity';
import { CreateUserInput } from 'src/users/dto/input/create-user.input';
import { UsersService } from 'src/users/users.service';
import { jwtSecret } from './constants';

import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        @InjectRepository(Token)
        private tokensRepository: Repository<Token>,
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
        expireDate.setHours(+1);
        const user = await this.usersService.getUserByName(userName);
        const payload = {
            id: user.userId,
            sub: userPassword,
            expire: expireDate,
        };
        const isMatch = await bcrypt.compare(userPassword, user.userPassword);
        if (isMatch) {
            // if (user.userName == userName && user.userPassword == userPassword) {
                const token = this.jwtService.sign(payload);
                const dbToken = this.tokensRepository.create({tokenString: token, expireDate: payload.expire, user: user});
                await this.tokensRepository.save(dbToken);
                return token;
            // } 
        } else {
            throw new Error('Invalid User Name or User Password');
        }
    }

    async logout(user: User, token: Token): Promise<Boolean> {
        console.log(token);
        const realUser = await this.usersService.getUserById(user.userId);
        if (user.userId == realUser.userId && realUser.userId == token.user.userId) {
            await this.tokensRepository.delete(token.tokenId);
            return true;
        } else {
            throw new Error('An Error Occurred');
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
