import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { Product } from '../entity/product.entity';
import { GetProductArgs } from './dto/args/get-product.args';
import { CreateProductInput } from './dto/input/create-product.input';
import { UpdateProductInput } from './dto/input/update-product.input';
import { DeleteProductInput } from './dto/input/delete-product.input';
import { GetProductsArgs } from './dto/args/get-products.args';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) { }

    public getProduct(getProductData: GetProductArgs): Promise<Product> {
        return this.productsRepository.findOne(getProductData);
    }
    
    async getProucts(getProductsData: GetProductsArgs): Promise<Product[]> {
        // console.log(getProductsData.productIds);
        return this.productsRepository.findByIds(getProductsData.productIds); //SELECT * products
    }
    
    async createProduct(createProductInput: CreateProductInput): Promise<Product> {
        // console.log(createProductInput.categoryId);
        const newProd = this.productsRepository.create(createProductInput);
        return this.productsRepository.save(newProd); //insert
    }

    async updateProduct(updateProductInput: UpdateProductInput, prodId: number): Promise<Product> {
        var oldProd = await this.productsRepository.findOneOrFail(prodId);
        if (oldProd.productId == prodId || oldProd) {
            oldProd.productName = updateProductInput.productName;
            oldProd.productPrice = updateProductInput.productPrice;
            oldProd.productDesc = updateProductInput.productDesc;
            oldProd.imageUrl = updateProductInput.imageUrl;
            oldProd.categoryId = updateProductInput.categoryId;
            return await oldProd.save();
        }
        return null;
    }

    async deleteProduct(deleteProductInput: DeleteProductInput) {
        var oldProd = await this.productsRepository.findOneOrFail(deleteProductInput.productId);
        return this.productsRepository.delete(oldProd);
    }
}
