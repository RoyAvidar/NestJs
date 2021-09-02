import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async createUser(createUserData: CreateUserInput): Promise<User> {
        const user = this.usersRepository.create(createUserData);
        return this.usersRepository.save(user);
    }

    async updateUser(updateUserData: UpdateUserInput, userId: number): Promise<User> {
        var oldUser = await this.usersRepository.findOneOrFail(userId);
        if (oldUser.userId == userId || oldUser) {
            oldUser.userName = updateUserData.userName;
            oldUser.userPassword = updateUserData.userPassword;
            oldUser.userPhone = updateUserData.userPhone;
            oldUser.isAdmin = updateUserData.isAdmin;
            return await oldUser.save();
        }
        return null;
    }

    public getUser(userId: string): Promise<User> {
        return this.usersRepository.findOne(userId);
    }

    public getUsers(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async deleteUser(deleteUserData: DeleteUserInput): Promise<void> {
        await this.usersRepository.delete(deleteUserData.userId);
    }

    public getUserByName(userName: string) {
        return this.usersRepository.findOne(userName);
    }
}
