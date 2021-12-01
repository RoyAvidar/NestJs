import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({req}) => ({headers: req.headers}),//graphql context has access to http req
      uploads: false
    }),
    AuthModule,
    PhotosModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
    PhotosModule,
    CategoriesModule,
    TypeOrmModule.forRoot(),
    CartModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
  
}
