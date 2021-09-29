import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/entity/cart.entity';
import { Order } from 'src/entity/order.entity';
import { User } from 'src/entity/user.entity';
import { OrdersModule } from 'src/orders/orders.module';
import { OrdersService } from 'src/orders/orders.service';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, User, Cart]),
    OrdersModule
  ],
  providers: [CartResolver, CartService, OrdersService]
})
export class CartModule {}
