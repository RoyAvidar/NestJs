import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { GetProductArgs } from "./dto/args/get-product.args";
import {Product} from "./models/product";
import {ProductsService} from "./products.service";

@Resolver(() => Product)
export class ProductsResolver {
    constructor(private readonly productsService: ProductsService) {}

    @Query(() => Product)
    getSingleProduct(@Args() getProductArgs: GetProductArgs) {
        return this.productsService.getProduct(getProductArgs.productId);
    }

    @Query(() => [Product], {name: 'products', nullable: 'items'})
    getProducts(@Args() getProductsArgs: GetProductArgs) {
        return this.productsService.getProucts();
    }
}