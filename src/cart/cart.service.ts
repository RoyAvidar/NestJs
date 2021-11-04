import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entity/cart.entity';
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

    async getCart(user: User): Promise<Cart> {
        const cart = await this.cartRepository.findOne({relations: ["products"], where: {user}});
        if (cart == null) {
            const newCart = this.cartRepository.create()
            newCart.user = user;
            newCart.totalPrice = 0;
            return this.cartRepository.save(newCart);
        }
        else {
            return cart;
        }
    }

    async createCart(user: User): Promise<Cart> {
        const newCart = this.cartRepository.create();
        newCart.user = user;
        newCart.totalPrice = 0;
        return this.cartRepository.save(newCart);
    }

    // + sign infront of an arg is the same as .toInt();
    async addProductToCart(user: User, addToCartInput: AddToCartInput) {
        const cart = await this.cartRepository.findOne(addToCartInput.cartId, {relations: ["user"]});
        const prod = await this.productRepository.findOne(addToCartInput.productId);
        if (cart.user.userId != user.userId) {
            throw new UnauthorizedException();
        }
        await this.cartRepository.createQueryBuilder().relation("products").of(cart).add(prod.productId);
        await this.cartRepository.update(cart.cartId, {totalPrice: +prod.productPrice + +cart.totalPrice, itemCount: cart.itemCount + 1});
        return true;
    }

    async removeProductFromCart(cartId: number, productId: number) {
        const cart = await this.cartRepository.findOne(cartId, {relations: ["products"]});
        if (cart.products.some(p => p.productId == productId)) {
            const prod = await this.productRepository.findOne(productId);
            await this.cartRepository.createQueryBuilder().relation("products").of(cart).remove(productId);
            await this.cartRepository.update(cart.cartId, {totalPrice: cart.totalPrice - prod.productPrice, itemCount: cart.itemCount - 1});
            return true;
        }
        return false;
    }

    async cleanCart(cartId: number, user: User) {
        const cart = await this.cartRepository.findOne(cartId, {relations: ["user", "products"]});
        if (cart.user.userId != user.userId) {
            throw new UnauthorizedException();
        }
        else {
            await this.cartRepository.createQueryBuilder().relation("products").of(cart).delete();
            await this.cartRepository.update(cart.cartId, {totalPrice: 0, products: []});
            return true;
        }
    }

    async submitCartToOrder(createOrderInput: CreateOrderInput, user: User) {
        if (!user) {
            throw new UnauthorizedException();
        }
        const newOrder = await this.ordersService.createOrder(createOrderInput, user);
        if (this.cleanCart(createOrderInput.cartId, user) && newOrder) {
            return true;
        }
        return false;
    }
}
