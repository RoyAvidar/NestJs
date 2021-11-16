import { Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entity/cart.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';
import { GetOrderArgs } from './dto/args/get-order.args';
import { CreateOrderInput } from './dto/input/create-order.input';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>
    ) {}
    
    async getSingleOrder(getOrderData: GetOrderArgs): Promise<Order> {
        return this.orderRepository.findOne(getOrderData, {relations: ["products", "user"]});
    }

    async getUserOrders(user: User): Promise<Order[]> {
        const userKek = await this.userRepository.findOne(user.userId, {relations: ["orders"]});
        const orders = await this.orderRepository.findByIds(userKek.orders, {relations: ["products"], order: {createdAt: "DESC"}});
        return orders;
    };

    async getOrders(user: User): Promise<Order[]> {
        if (!user.isAdmin) {
            throw new UnauthorizedException();
        }
        return this.orderRepository.find({relations: ["products", "user"], order: {createdAt: "DESC"}});
    }

    async createOrder(createOrderInput: CreateOrderInput, user: User): Promise<Order> {
        const cart = await this.cartRepository.findOne(createOrderInput.cartId, {relations: ['user', 'products']});
        if (cart.user.userId != user.userId) {
            throw new UnauthorizedException();
        }
        const newOrder = this.orderRepository.create();
        newOrder.user = cart.user;
        newOrder.products = cart.products;
        newOrder.orderPrice = cart.totalPrice;
        newOrder.createdAt = new Date();
        return this.orderRepository.save(newOrder);
    }

    async addProductToOrder(orderId: number, productId: number) {
        const order = await this.orderRepository.findOne(orderId);
        await this.orderRepository.createQueryBuilder().relation("products").of(order).add(productId);
        return true;
    }

    async getOrderPrice(orderId: number) {
        const order = await this.orderRepository.findOne(orderId);
        return order.orderPrice;
    }
}
