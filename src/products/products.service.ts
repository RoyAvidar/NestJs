import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './models/product';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private usersRepository: Repository<Product>,
    ) { }

    // private products: Product[] = [];

    public createProduct(): Product {
        return null;
    }

    public addProduct(): Product {
        return null;
    }

    public getProduct(productId: string): Product {
        return null;
    }

    public getProucts(): Product[] {
        return null;
    }

    public updateProduct(): Product {
        return null;
    }

    public deleteProduct() {

    }
}
