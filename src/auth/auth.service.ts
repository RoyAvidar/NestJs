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

    //need to change the way this function generates a token and saves it.
    async login(userName: string, userPassword: string) {
        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);
        // console.log(expireDate);
        const user = await this.usersService.getUserByName(userName);
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(userPassword, user.userPassword);
        if (user.userName == userName && isMatch) {
            const dbToken = await this.tokensRepository.save({expireDate: expireDate, user: user});
            const payload = {
                token: dbToken.tokenId,
                expireDate: dbToken.expireDate
            };
            const token = this.jwtService.sign(payload);
            return token;
        } else {
            throw new Error('Invalid User Name or User Password');
        }
    }

    async logout(user: User, token: Token): Promise<Boolean> {
        const realUser = await this.usersService.getUserById(user.userId);
        if (user.userId == realUser.userId) {
            await this.tokensRepository.delete(token);
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
    const realToken = await this.tokensRepository.findOne(token);
    if (realToken.expireDate.getTime() >= new Date().getTime()) {
        return realToken.expireDate.getTime();
    } else {
        throw new Error('Tokens expirey date is over.')
    }
   }
}
