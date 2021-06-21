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

    async createUser(createUserInput: CreateUserInput): Promise<User> {
        const newUser = this.usersRepository.create(createUserInput);
        return await this.usersRepository.save(newUser);
    }

    updateUser(): User {
        return null;
    }

    getUser(userId: string): Promise<User> {
        return this.usersRepository.findOneOrFail(userId);
    }

    getUsers(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async deleteUser(userId: string): Promise<void> {
        await this.usersRepository.delete(userId);
        return;
    }
}
