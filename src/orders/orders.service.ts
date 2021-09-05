import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';
import { GetOrderArgs } from './dto/args/get-order.args';
import { CreateOrderInput } from './dto/input/create-order.input';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
    ) {}
    
    async getSingleOrder(getOrderData: GetOrderArgs): Promise<Order> {
        return this.orderRepository.findOne(getOrderData);
    }

    async getOrders(): Promise<Order[]> {
        return this.orderRepository.find();
    }

    async createOrder(createOrderInput: CreateOrderInput): Promise<Order> {
        const newOrder = this.orderRepository.create(createOrderInput);
        return this.orderRepository.save(newOrder);
    }

    async addProductToOrder(orderId: string, productId: string) {
        const order = this.orderRepository.findOne(orderId);
        await this.orderRepository.createQueryBuilder().relation("products").of(order).add(productId);
        return true;
    }
}
