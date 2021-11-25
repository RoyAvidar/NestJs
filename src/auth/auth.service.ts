import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/entity/user.entity';
import { CreateUserInput } from 'src/users/dto/input/create-user.input';
import { UsersService } from 'src/users/users.service';
import { jwtSecret } from './constants';

import { createDecipheriv, createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async encryption(userPassword: string) {
        const iv = randomBytes(16);
        const password = userPassword;

        const key = await promisify(scrypt)(password, 'salt', 32) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, iv);

        const textToEncrypt = 'Nest';
        const encryptedText = Buffer.concat([
            cipher.update(textToEncrypt),
            cipher.final(),
        ]);
        return encryptedText;
    }

    async decipher(encryptedPassword: Buffer) {
        const iv = randomBytes(16);
        const key = await promisify(scrypt)(encryptedPassword, 'salt', 32) as Buffer;

        const decipher = createDecipheriv('aes-256-ctr', key, iv);
        const decryptedText = Buffer.concat([
            decipher.update(encryptedPassword),
            decipher.final()
        ]);
        return decryptedText;
    }

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
