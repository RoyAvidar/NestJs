import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entity/cart.entity';
// import { Order } from 'src/entity/order.entity';
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
        // @InjectRepository(Order)
        // private readonly ordersRepository: Repository<Order>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
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

    // + sign infront of an arg is the same as .toInt();
    async addProductToCart(addToCartInput: AddToCartInput) {
        const cart = await this.cartRepository.findOne(addToCartInput.cartId);
        const prod = await this.productRepository.findOne(addToCartInput.productId);
        await this.cartRepository.createQueryBuilder().relation("products").of(cart).add(addToCartInput.productId);
        await this.cartRepository.update(cart.cartId, {totalPrice: +prod.productPrice + +cart.totalPrice});
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

    async removeFromCart(cartId: number, prodId: number) {
        const cart = await this.cartRepository.findOne(cartId, {relations: ["products"]});
        cart.products.forEach(p => {
            if (p.productId == prodId) {
                this.cartRepository.delete(prodId);
                return true;
            }
        });
        throw new ErrorEvent("couldn't find a product to delete");
    }

    async submitCartToOrder(cartId: number, createOrderInput: CreateOrderInput) {
        const cart = await this.cartRepository.findOne(cartId, {relations: ["user", "products"]});
        const newOrder = await this.ordersService.createOrder(createOrderInput);
            cart.products.forEach(p => {
                this.ordersService.addProductToOrder(newOrder.orderId, p.productId);
            });
            newOrder.orderPrice = createOrderInput.orderPrice;
            this.cleanCart(cart.cartId);
            return true;
        
    }
}
