import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { GetProductArgs } from "./dto/args/get-product.args";
import { CreateProductInput } from "./dto/input/create-product.input";
import { DeleteProductInput } from "./dto/input/delete-product.input";
import { UpdateProductInput } from "./dto/input/update-product.input";
import { Product } from "../entity/product.entity";
import { ProductsService } from "./products.service";
import { GetProductsArgs } from "./dto/args/get-products.args";

@Resolver(() => Product)
export class ProductsResolver {
    constructor(private readonly productsService: ProductsService) {}

    @Query(() => Product)
    getSingleProduct(@Args() getProductArgs: GetProductArgs) {
        return this.productsService.getProduct(getProductArgs);
    }

    @Query(() => [Product])
    getProducts(@Args('getProductsArgs') getProductsData: GetProductsArgs) {
        return this.productsService.getProucts(getProductsData);
    }

    @Mutation(() => Product)
    createProduct(@Args('createProductData') createProductData: CreateProductInput) {
        return this.productsService.createProduct(createProductData);
    }

    @Mutation(() => Product)
    updateProduct(@Args('updateProductData') updateProductData: UpdateProductInput, @Args('prodId') prodId: number) {
        return this.productsService.updateProduct(updateProductData, prodId);
    }

    @Mutation(() => Product)
    deleteProduct(@Args('deleteProductData') deleteProductData: DeleteProductInput) {
        return this.productsService.deleteProduct(deleteProductData);
    }
}