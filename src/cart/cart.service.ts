import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private ordersService: OrdersService
    ) {}

    async getCartId(user: User): Promise<number> {
        const cart = await this.cartRepository.findOne({where: {user}});
        if (cart == null) {
            throw new NotFoundException("Couldn't find cartId");
        } 
        return cart.cartId;
    }

    async getCart(user: User): Promise<Cart> {
        const cart = await this.cartRepository.findOne({relations: ["products", "user"], where: {user}});
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

    async getItemCount(user: User): Promise<number> {
        const cart = await this.cartRepository.findOne({relations: ["products", "user"], where: {user}});
        if (cart == null) {
            throw new Error("couldn't find a cart");
        } else {
            return cart.itemCount;
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
        const cart = await this.cartRepository.findOne(addToCartInput.cartId, {relations: ["user", "products"]});
        const prod = await this.productRepository.findOne(addToCartInput.productId);
        if (cart.user.userId != user.userId) {
            throw new UnauthorizedException();
        }
        if (cart.products.some((p) => p.productId == prod.productId)) {
            //prod quantity +1;
            await this.cartRepository.update(cart.cartId, {totalPrice: +prod.productPrice + +cart.totalPrice, itemCount: +cart.itemCount + 1});
            return true;
        }
        await this.cartRepository.createQueryBuilder().relation("products").of(cart).add(prod.productId);
        await this.cartRepository.update(cart.cartId, {totalPrice: +prod.productPrice + +cart.totalPrice, itemCount: +cart.itemCount + 1});
        return true;
    }

    async removeProductFromCart(cartId: number, productId: number) {
        const cart = await this.cartRepository.findOne(cartId, {relations: ["products"]});
        if (cart.products.some(p => p.productId == productId)) {
            const prod = await this.productRepository.findOne(productId);
                //remove all of the entries in the join table
                await this.cartRepository.createQueryBuilder().relation("products").of(cart).remove(prod);
                await this.cartRepository.update(cart.cartId, {totalPrice: 0, itemCount: 0});
            
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
            cart.itemCount = 0;
            cart.totalPrice = 0;
            cart.products = [];
            this.cartRepository.save(cart);
            return true;
        }
    }

    async submitCartToOrder(createOrderInput: CreateOrderInput, user: User) {
        const cart = await this.cartRepository.findOne(createOrderInput.cartId, {relations: ["user", "products"]});
        if (cart.products.length <= 0) {
            throw new NotFoundException("Cart is empty, please provide products to cart.");
        }
        if (!user) {
            throw new UnauthorizedException();
        }
        if (this.cleanCart(createOrderInput.cartId, user)) {
            const newOrder = await this.ordersService.createOrder(createOrderInput, user);
            return true;
        }
        return false;
    }
}
