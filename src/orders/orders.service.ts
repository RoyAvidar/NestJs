import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './models/order.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
    ) { }

    getOrder(orderId: string): Promise<Order> {
        return this.ordersRepository.findOneOrFail(orderId);
    }

    getOrders(): Promise<Order[]> {
        return this.ordersRepository.find();
    }
}
