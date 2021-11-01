import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entity/cart.entity';
// import { Order } from 'src/entity/order.entity';
import { Product } from 'src/entity/product.entity';
import { User } from 'src/entity/user.entity';
import { CreateOrderInput } from 'src/orders/dto/input/create-order.input';
import { OrdersService } from 'src/orders/orders.service';
import { Repository } from 'typeorm';
import { AddToCartInput } from './dto/input/add-cart.input';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private ordersService: OrdersService
    ) {}

    async getCart(cartId: number): Promise<Cart> {
        return this.cartRepository.findOneOrFail(cartId, {relations: ["products", "user"]});
    }

    async createCart(user: User): Promise<Cart> {
        const newCart = this.cartRepository.create();
        newCart.user = user;
        newCart.totalPrice = 0;
        return this.cartRepository.save(newCart);
    }

    // + sign infront of an arg is the same as .toInt();
    async addProductToCart(user: User, addToCartInput: AddToCartInput) {
        const cart = await this.cartRepository.findOne(addToCartInput.cartId);
        const prod = await this.productRepository.findOne(addToCartInput.productId);
        if (!user) {
            throw new UnauthorizedException();
        }
        await this.cartRepository.createQueryBuilder().relation("products").of(cart).add(addToCartInput.productId);
        await this.cartRepository.update(cart.cartId, {totalPrice: +prod.productPrice + +cart.totalPrice});
        return true;
    }

    async removeProductFromCart(cartId: number, productId: number) {
        const cart = await this.cartRepository.findOne(cartId, {relations: ["products"]});
        if (cart.products.some(p => p.productId == productId)) {
            //find the product in the array of cart.products
            if (cart.products.length >= 2) {
                //delete only one (quantity) prod from the cart.
            }
            await this.cartRepository.createQueryBuilder().relation("products").of(cart).remove(productId);
            return true;
        }
        return false;
    }

    async cleanCart(cartId: number) {
        const cart = await this.cartRepository.findOne(cartId);
        if (cart) {
            cart.totalPrice = 0;
            await this.cartRepository.createQueryBuilder().relation("products").of(cart).delete();
            return true;
        }
        return false;
    }

    async submitCartToOrder(createOrderInput: CreateOrderInput, user: User) {
        if (!user) {
            return false;
        }
        const newOrder = await this.ordersService.createOrder(createOrderInput, user);
        if (this.cleanCart(createOrderInput.cartId)) {
            return true;
        }
        return false;
    }
}
