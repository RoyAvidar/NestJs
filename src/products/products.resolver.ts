import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { GetProductArgs } from "./dto/args/get-product.args";
import { CreateProductInput } from "./dto/input/create-product.input";
import { DeleteProductInput } from "./dto/input/delete-product.input";
import { UpdateProductInput } from "./dto/input/update-product.input";
import {Product} from "./models/product";
import {ProductsService} from "./products.service";

@Resolver(() => Product)
export class ProductsResolver {
    constructor(private readonly productsService: ProductsService) {}

    @Query(() => Product)
    getSingleProduct(@Args() getProductArgs: GetProductArgs) {
        return this.productsService.getProduct(getProductArgs);
    }

    @Query(() => [Product], {name: 'products', nullable: 'items'})
    getProducts(@Args() getProductsArgs: GetProductArgs) {
        return this.productsService.getProucts();
    }

    @Mutation(() => Product)
    createProduct(@Args('createProductData') createProductData: CreateProductInput) {
        return this.productsService.createProduct(createProductData);
    }

    @Mutation(() => Product)
    updateProduct(@Args('updateProductData') updateProductData: UpdateProductInput) {
        return this.productsService.updateProduct(updateProductData);
    }

    @Mutation(() => Product)
    deleteProduct(@Args('deleteProductData') deleteProductData: DeleteProductInput) {
        return this.productsService.deleteProduct(deleteProductData);
    }
}