import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './models/product';
import { GetProductArgs } from './dto/args/get-product.args';
import { CreateProductInput } from './dto/input/create-product.input';
import { UpdateProductInput } from './dto/input/update-product.input';
import { DeleteProductInput } from './dto/input/delete-product.input';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) { }

    public getProduct(getProductData: GetProductArgs): Promise<Product> {
        return this.productsRepository.findOne(getProductData);
    }
    
    public getProucts(): Promise<Product[]> {
        return this.productsRepository.find();
    }
    
    public createProduct(createProductInput: CreateProductInput): Product {
        return null;
    }

    public updateProduct(updateProductInput: UpdateProductInput): Product {
        return null;
    }

    public deleteProduct(deleteProductInput: DeleteProductInput) {
        return this.productsRepository.delete(deleteProductInput);
    }
}
