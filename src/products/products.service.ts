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
    private products: Product[] = [];
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
        // const product: Product = {
        //     productId: '1',
        //     ...createProductInput
        // }
        // this.products.push(product);
        // return product;
        return null;
    }

    public updateProduct(updateProductInput: UpdateProductInput): Product {
        const product = this.products.find(prod => prod.productId === updateProductInput.productId);
        Object.assign(product, updateProductInput);
        return product;
    }

    public deleteProduct(deleteProductInput: DeleteProductInput) {
        return this.productsRepository.delete(deleteProductInput);
    }
}
