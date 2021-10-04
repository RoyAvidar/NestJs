import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/entity/user.entity';
import { CreateUserInput } from 'src/users/dto/input/create-user.input';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { jwtSecret } from './constants';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async validate(userName: string, userPassword: string): Promise<User> {
        const user = await this.usersService.getUserByName(userName);
        if (!user) {
            return null;
        }
        //usually compare encrypted pass in db to the pass that is passed in here(bcrypt).
        const passwordIsValid = userPassword === (await user).userPassword;
        return passwordIsValid ? user : null;
        
    }

    async login(userName: string, userPassword: string) {
        const payload = {
            name: userName,
            sub: userPassword,
        };
        return this.jwtService.sign(payload);
        
    }

    async verifyToken(token: string): Promise<User> {
        const decoodedPayload = this.jwtService.verify(token, {
            secret: jwtSecret
        })
        //reach out to db to get the user.
        const user = this.usersService.getUserByName(decoodedPayload.name);
        if (!user) {
            throw new Error('Unable to get the user from decoded token.');
        }

        return user;
    }

    async signUp(createUserInput: CreateUserInput): Promise<User> {
        const user = await this.usersService.createUser(createUserInput);
        return user;
    }

    async getUser(userId: string): Promise<User> {
        const user = await this.userRepository.findOne(userId, {relations: ["orders"]});
        if (!user) {
            throw new Error('Unable to find user.');
        }
        return user;
    }
}
