import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from 'src/categories/categories.module';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/entity/category.entity';
import { User } from 'src/entity/user.entity';
import { PhotosModule } from 'src/photos/photos.module';
import { PhotosService } from 'src/photos/photos.service';
import { UsersModule } from 'src/users/users.module';
import { Product } from '../entity/product.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Product, Category]),
    UsersModule,
    CategoriesModule,
    PhotosModule
  ],
  providers: [ProductsService, ProductsResolver, CategoriesService, PhotosService]
})
export class ProductsModule {}
