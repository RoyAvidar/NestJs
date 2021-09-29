import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entity/cart.entity';
import { Product } from 'src/entity/product.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { AddToCartInput } from './dto/input/add-cart.input';
import { CreateCartInput } from './dto/input/create-cart.input';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
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

    async addProductToCart(addToCartInput: AddToCartInput) {
        const cart = await this.cartRepository.findOne(addToCartInput.cartId);
        await this.cartRepository.createQueryBuilder().relation("products").of(cart).add(addToCartInput.productId);
        return true;
    }

    async removeProductFromCart(cartId: number, productId: number) {
        const cart = await this.cartRepository.findOne(cartId, {relations: ["products"]});
        console.log(cart);
        if (cart.products.some(p => p.productId == productId)) {
            //find the product in the array of cart.products
            await this.cartRepository.createQueryBuilder().relation("products").of(cart).remove(productId);
            return true;
        }
        return false;
    }

    async cleanCart(cartId: number) {
        const cart = await this.cartRepository.findOne(cartId);
        await this.cartRepository.createQueryBuilder().relation("products").of(cart).delete();
        return true;
    }
}
