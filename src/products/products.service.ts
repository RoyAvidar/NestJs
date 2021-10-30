import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { Product } from '../entity/product.entity';
import { GetProductArgs } from './dto/args/get-product.args';
import { CreateProductInput } from './dto/input/create-product.input';
import { UpdateProductInput } from './dto/input/update-product.input';
import { DeleteProductInput } from './dto/input/delete-product.input';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/entity/user.entity';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        private categoriesService: CategoriesService,
        private usersService: UsersService,
    ) { }

    public getProduct(getProductData: GetProductArgs): Promise<Product> {
        return this.productsRepository.findOne(getProductData);
    }
    
    public getProucts(): Promise<Product[]> {
        return this.productsRepository.find({relations: ["category"]}); //SELECT * products
    }
    
    async createProduct(user : User, createProductInput: CreateProductInput): Promise<Product> {
        if (!user.isAdmin) {
            throw new UnauthorizedException();
        }
        const category = await this.categoriesService.getCategory(createProductInput.categoryId);
        // console.log(createProductInput.categoryId);
        const newProd = this.productsRepository.create({
            productName: createProductInput.productName,
            productPrice: createProductInput.productPrice,
            productDesc: createProductInput.productDesc,
            imageUrl: createProductInput.imageUrl,
            category: category
        });
        return this.productsRepository.save(newProd); //insert
    }

    async updateProduct(user: User, updateProductInput: UpdateProductInput, prodId: number): Promise<Product> {
        if (!user.isAdmin) {
            throw new UnauthorizedException();
        }
        var oldProd = await this.productsRepository.findOneOrFail(prodId);
        if (oldProd.productId == prodId || oldProd) {
            oldProd.productName = updateProductInput.productName;
            oldProd.productPrice = updateProductInput.productPrice;
            oldProd.productDesc = updateProductInput.productDesc;
            oldProd.imageUrl = updateProductInput.imageUrl;
            const cat = await this.categoriesService.getCategory(updateProductInput.categoryId.toString());
            oldProd.category = cat;
            return await oldProd.save();
        }
        return null;
    }

    async deleteProduct(deleteProductInput: DeleteProductInput) {
        var oldProd = await this.productsRepository.findOneOrFail(deleteProductInput.productId);
        return this.productsRepository.delete(oldProd);
    }

    getUser(user: User): Promise<User> {
        return this.usersService.getUser(user);
    }

    // get categoryName that is linked to a product.
    async getCategoryName(categoryId: string): Promise<String> {
        const cat = await this.categoriesService.getCategory(categoryId);
        return cat.categoryName;
    }
}
