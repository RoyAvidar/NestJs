import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/entity/cart.entity';
import { User } from 'src/entity/user.entity';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Cart]),
  ],
  providers: [CartResolver, CartService]
})
export class CartModule {}
