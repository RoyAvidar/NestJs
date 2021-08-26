import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entity/product.entity';
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
    
    async getProucts(): Promise<Product[]> {
        return this.productsRepository.find(); //SELECT * products
    }
    
    async createProduct(createProductInput: CreateProductInput): Promise<Product> {
        const newProd = this.productsRepository.create(createProductInput);
        return this.productsRepository.save(newProd); //insert
    }

    public updateProduct(updateProductInput: UpdateProductInput): Product {
        // const product = this.products.find(prod => prod.productId === updateProductInput.productId);
        // Object.assign(product, updateProductInput);
        return null;
    }

    public deleteProduct(deleteProductInput: DeleteProductInput) {
        return this.productsRepository.delete(deleteProductInput);
    }
}
