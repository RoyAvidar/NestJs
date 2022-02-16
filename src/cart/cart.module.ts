import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/entity/address.entity';
import { CartProduct } from 'src/entity/cart-product.entity';
import { Cart } from 'src/entity/cart.entity';
import { Order } from 'src/entity/order.entity';
import { ProductOrder } from 'src/entity/product-order.entity';
import { Product } from 'src/entity/product.entity';
import { User } from 'src/entity/user.entity';
import { OrdersModule } from 'src/orders/orders.module';
import { OrdersService } from 'src/orders/orders.service';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Order, User, Cart, CartProduct, ProductOrder, Address]),
    OrdersModule
  ],
  providers: [CartResolver, CartService, OrdersService],
  exports: [CartService]
})
export class CartModule {}
