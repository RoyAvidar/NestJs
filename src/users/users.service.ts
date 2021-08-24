import { Injectable } from '@nestjs/common';
import { User } from './models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/input/create-user.input';

@Injectable()
export class UsersService {
    // private users: User[] = [];
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    public createUser(createUserData: CreateUserInput) {
        // this.usersRepository.create();
        // const user: User = {
        //     userId: 'elad',
        //     ...createUserData
        // };
        // return user;
    }

    public updateUser(): User {
        return null;
    }

    public getUser(userId: string): Promise<User> {
        return this.usersRepository.findOne(userId);
    }

    public getUsers(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async deleteUser(userId: string): Promise<void> {
        await this.usersRepository.delete(userId);
    }

    public getUserByName(userName: string) {
        return this.usersRepository.findOne(userName);
    }
}
