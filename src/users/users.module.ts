import { Module } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from 'src/cart/cart.module';
import { Cart } from 'src/entity/cart.entity';
import { Product } from 'src/entity/product.entity';
import { PhotosModule } from 'src/photos/photos.module';
import { PhotosService } from 'src/photos/photos.service';
import { User } from '../entity/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Product, Cart]),
    PhotosModule,
    CartModule
    // PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [UsersService, UsersResolver, PhotosService],
  exports: [UsersService],
})
export class UsersModule {}
