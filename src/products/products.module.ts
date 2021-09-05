import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UsersModule } from 'src/users/users.module';
import { Product } from '../entity/product.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Product]),
    UsersModule
  ],
  providers: [ProductsService, ProductsResolver]
})
export class ProductsModule {}
