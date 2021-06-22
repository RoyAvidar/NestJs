import { Injectable } from '@nestjs/common';
import { User } from './models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/input/create-user.input';
import { validate } from 'class-validator';

@Injectable()
export class UsersService {
    // private users: User[] = [];
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async createUser(createUserInput: CreateUserInput): Promise<User> {
        const newUser = this.usersRepository.create(createUserInput);
        const errors = await validate(newUser);
        if (errors.length > 0) {
            throw new Error(`Validation failed!`); 
        } else {
            await this.usersRepository.save(newUser);
        }
        return;
    }

    updateUser(): User {
        return null;
    }

    getUser(userId: string): Promise<User> {
        return this.usersRepository.findOneOrFail(userId); 
    }

    getUsers(): Promise<User[]> {
        return this.usersRepository.find({relations: ['products']}); //SELECT * from user JOIN products.
    }

    async deleteUser(userId: string): Promise<void> {
        await this.usersRepository.delete(userId);
        return;
    }
}
