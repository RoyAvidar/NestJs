import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/entity/cart.entity';
import { Product } from 'src/entity/product.entity';
import { User } from 'src/entity/user.entity';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, User, Cart]),
  ],
  providers: [CartResolver, CartService]
})
export class CartModule {}
