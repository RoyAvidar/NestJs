import { Module } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';
import { PhotosModule } from 'src/photos/photos.module';
import { PhotosService } from 'src/photos/photos.service';
import { ProductsService } from 'src/products/products.service';
import { User } from '../entity/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Product]),
    PhotosModule
    // PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [UsersService, UsersResolver, PhotosService],
  exports: [UsersService],
})
export class UsersModule {}
