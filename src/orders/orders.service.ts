import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entity/order.entity';
import { GetOrderArgs } from './dto/args/get-order.args';

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
}
