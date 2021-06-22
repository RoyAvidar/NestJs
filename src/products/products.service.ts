import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/models/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/input/create-product.input';
import { UpdateProductInput } from './dto/input/update-product.input';
import { Product } from './models/product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        private usersService: UsersService
    ) { }

    // private products: Product[] = [];

    createProduct(createProductInput: CreateProductInput): Promise<Product> {
        const newProduct = this.productsRepository.create(createProductInput);
        return this.productsRepository.save(newProduct);
    }

    addProduct(): Product {
        return null;
    }

    getProduct(productId: string): Promise<Product> {
        return this.productsRepository.findOneOrFail(productId);
    }

    getProucts(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    async updateProduct(updateProductInput: UpdateProductInput): Promise<Product> {
        const oldProductData = null;
        await this.productsRepository.update(oldProductData, updateProductInput);
        return null;
    }

    async deleteProduct(productId: string): Promise<void> {
        await this.productsRepository.delete(productId);
        return;
    }

    getUser(userId: string): Promise<User>{
        return this.usersService.getUser(userId);
    }
}
