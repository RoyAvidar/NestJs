import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entity/order.entity';
import { User } from 'src/entity/user.entity';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';
import { Cart } from 'src/entity/cart.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Order, Cart]),
  ],
  providers: [OrdersService, OrdersResolver]
})
export class OrdersModule {}
