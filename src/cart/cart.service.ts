import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entity/cart.entity';
import { Order } from 'src/entity/order.entity';
import { Product } from 'src/entity/product.entity';
import { User } from 'src/entity/user.entity';
import { CreateOrderInput } from 'src/orders/dto/input/create-order.input';
import { OrdersService } from 'src/orders/orders.service';
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
        @InjectRepository(Order)
        private readonly ordersRepository: Repository<Order>,
        // @InjectRepository(Product)
        // private readonly productRepository: Repository<Product>,
        private ordersService: OrdersService
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
        // const prod = await this.productRepository.findOne(addToCartInput.productId);
        // cart.totalPrice += prod.productPrice;
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

    async submitCartToOrder(cartId: number, createOrderInput: CreateOrderInput) {
        const cart = await this.cartRepository.findOne(cartId);
        const newOrder = await this.ordersService.createOrder(createOrderInput);
        if (newOrder != null) {
            newOrder.orderPrice = cart.totalPrice;
            newOrder.user = cart.user;
            newOrder.products = cart.products;
            return this.ordersRepository.save(newOrder);
        }
        throw new NotFoundException('Could not find the order.');
        
    }
}
