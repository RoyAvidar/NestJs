import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';
// import { Product } from 'src/entity/product.entity';
// import { ProductsService } from 'src/products/products.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async createUser(createUserData: CreateUserInput): Promise<User> {
        const demi = await this.usersRepository.findOne(createUserData.userName);
        if (demi) {
            throw new NotFoundException("UserName Already Exists.")
        } else {
            const user = this.usersRepository.create(createUserData);
            return this.usersRepository.save(user);
        }
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

    async getUser(user: User): Promise<User> {
        return await this.usersRepository.findOne(user.userId, {relations: ["products", "orders", "cart"]});
    }

    public getUsers(user: User): Promise<User[]> {
        if (!user.isAdmin) {
            throw new UnauthorizedException();
        }
        return this.usersRepository.find({relations: ["products", "orders"]});
    }

    async deleteUser(deleteUserData: DeleteUserInput): Promise<void> {
        await this.usersRepository.delete(deleteUserData.userId);
    }

    public getUserByName(userName: string) {
        return this.usersRepository.findOne({where: {userName}});
    }

    async addProductToUser(reqUser: User, productId: string) {
        const user = await this.usersRepository.findOne(reqUser.userId);
        await this.usersRepository.createQueryBuilder().relation("products").of(user).add(productId);
        return true;
    }

    async removeProductFromUser(reqUser: User, productId: string) {
        const user = await this.usersRepository.findOneOrFail(reqUser.userId);
        await this.usersRepository.createQueryBuilder().relation("products").of(user).remove(productId);
        return true;
    }

    async addOrderToUser(userId: string, orderId: string) {
        const user = await this.usersRepository.findOne(userId);
        await this.usersRepository.createQueryBuilder().relation("orders").of(user).add(orderId);
        return true;
    }
}
