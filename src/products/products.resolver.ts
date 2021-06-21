import { Resolver, Query, Args, Mutation, Parent } from "@nestjs/graphql";
import { User } from "src/users/models/user.entity";
import { GetProductArgs } from "./dto/args/get-product.args";
import { CreateProductInput } from "./dto/input/create-product.input";
import {Product} from "./models/product.entity";
import {ProductsService} from "./products.service";

@Resolver(() => Product)
export class ProductsResolver {
    constructor(private readonly productsService: ProductsService) {}

    @Query(() => Product)
    getSingleProduct(@Args('getProductArgs') getProductArgs: GetProductArgs) {
        return this.productsService.getProduct(getProductArgs.productId);
    }

    @Query(() => [Product], {name: 'products', nullable: 'items'})
    getProducts() {
        return this.productsService.getProucts();
    }

    @Query()
    getUser(@Parent() product: Product) {
        return this.productsService.getUser(product.userId);
    }

    @Mutation(() => Product)
    createProduct(@Args('createPerInput') createProductInput: CreateProductInput) {
        return this.productsService.createProduct(createProductInput);
    }
}