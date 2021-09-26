import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entity/cart.entity';
import { Product } from 'src/entity/product.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateCartInput } from './dto/input/create-cart.input';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async getCart(cartId: number): Promise<Cart> {
        return this.cartRepository.findOneOrFail(cartId);
    }

    async createCart(createCartInput: CreateCartInput): Promise<Cart> {
        const user = await this.userRepository.findOne(createCartInput.userId);
        const newCart = this.cartRepository.create();
        newCart.user = user;
        newCart.totalPrice = createCartInput.totalPrice;
        return this.cartRepository.save(newCart);
    }

    async addProductToCart(cartId: number, productsId: string[]) {
        const cart = await this.cartRepository.findOne(cartId);
        await this.cartRepository.createQueryBuilder().relation("products").of(cart).add(productsId);
        return true;
    }
}
