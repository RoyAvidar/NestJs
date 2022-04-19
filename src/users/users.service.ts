import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/input/create-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import * as bcrypt from 'bcrypt';
import { PhotosService } from 'src/photos/photos.service';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private photosService: PhotosService,
        private cartService: CartService,
    ) { }

    async createUser(createUserData: CreateUserInput): Promise<User> {
        const demi = await this.usersRepository.findOne(createUserData.userName);
        if (demi) {
            throw new NotFoundException("UserName Already Exists.")
        } else {
            let user = await this.usersRepository.create(createUserData);
            user = await this.usersRepository.save(user);
            await this.cartService.createCart(user);
            return user;
        }
    }

    async updateUser(updateUserData: UpdateUserInput, user: User): Promise<User> {
        var oldUser = await this.usersRepository.findOneOrFail(user.userId);
        if (oldUser.userId == user.userId && oldUser) {
            oldUser.userName = updateUserData.userName;
            oldUser.userLastName = updateUserData.userLastName;
            oldUser.userPhone = updateUserData.userPhone;
            return await oldUser.save();
        }
        return null;
    }

    async changePassword(userPassword: string, user: User): Promise<Boolean> {
        var validUser = await this.usersRepository.findOneOrFail(user.userId);
        if (user || validUser.userId == user.userId) {
            const saltOrrounds = 10;
            var newUserPassword = await bcrypt.hash(userPassword, saltOrrounds);
            validUser.userPassword = newUserPassword;
            await validUser.save();
            return true;
        }
        return false;
    }

    async getUser(user: User): Promise<User> {
        return await this.usersRepository.findOne(user.userId, {relations: ["products", "orders", "cart", "address"]});
    }

    async getUserById(userId: number): Promise<User> {
        return await this.usersRepository.findOne(userId);
    }

    async getUserId(reqUser: User): Promise<number> {
        return reqUser.userId; 
    }

    public getUsers(user: User): Promise<User[]> {
        if (!user.isAdmin) {
            throw new UnauthorizedException();
        }
        return this.usersRepository.find({relations: ["products", "orders"]});
    }

    async deleteUser(user: User): Promise<Boolean> {
        await this.photosService.deleteUserProfileImageFile(user);
        await this.usersRepository.delete(user.userId);
        return true;
    }

    public getUserByName(userName: string) {
        return this.usersRepository.findOne({where: {userName}, relations: ["orders"]});
    }

    async getUserDarkMode(user: User): Promise<Boolean> {
        var realUser = await this.usersRepository.findOneOrFail(user.userId);
        return realUser.isDarkMode;
    }

    async toggleUserDarkMode(user: User): Promise<Boolean> {
        var realUser = await this.usersRepository.findOneOrFail(user.userId);
        if (realUser.userId == user.userId) {
            realUser.isDarkMode = !realUser.isDarkMode;
            // console.log(realUser.isDarkMode);
            await realUser.save();
            return realUser.isDarkMode;
        } else {
            throw new Error("Couldn't find a user.");
        }
    }

    async toggleUserIsAdmin(userId: number, reqUser: User): Promise<Boolean> {
        var adminUser = await this.usersRepository.findOneOrFail(reqUser.userId);
        if (adminUser.isAdmin == true) {
            var realUser = await this.usersRepository.findOneOrFail(userId);
            if (adminUser.userId == realUser.userId) {
                throw new Error("You cannot toggle your own admin status!")
            }
            realUser.isAdmin = !realUser.isAdmin;
            await realUser.save();
            return realUser.isAdmin;
        }
        throw new UnauthorizedException("Only admin can access this query");
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
