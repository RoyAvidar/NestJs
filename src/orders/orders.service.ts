import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
        private userRepository: Repository<User>
    ) {}
    
    async getSingleOrder(getOrderData: GetOrderArgs): Promise<Order> {
        return this.orderRepository.findOne(getOrderData, {relations: ["products", "user"]});
    }

    async getOrders(): Promise<Order[]> {
        return this.orderRepository.find({relations: ["products", "user"]});
    }

    async createOrder(createOrderInput: CreateOrderInput): Promise<Order> {
        const user = await this.userRepository.findOne(createOrderInput.userId);
        const newOrder = this.orderRepository.create();
        newOrder.user = user;
        newOrder.orderPrice = createOrderInput.orderPrice;
        return this.orderRepository.save(newOrder);
    }

    async addProductToOrder(orderId: number, productId: number) {
        const order = this.orderRepository.findOne(orderId);
        await this.orderRepository.createQueryBuilder().relation("products").of(order).add(productId);
        return true;
    }
}
