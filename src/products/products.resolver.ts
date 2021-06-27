import { Resolver, Query, Args, Mutation, Parent, ResolveField } from "@nestjs/graphql";
import { User } from "src/users/models/user.entity";
import { GetProductArgs } from "./dto/args/get-product.args";
import { CreateProductInput } from "./dto/input/create-product.input";
import { DeleteProductInput } from "./dto/input/delete-product.input";
import { UpdateProductInput } from "./dto/input/update-product.input";
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

    @ResolveField(() => User)
    getUser(@Parent() product: Product) {
        return this.productsService.getUser(product.userId);
    }

    @Mutation(() => Product)
    createProduct(@Args('createPerInput') createProductInput: CreateProductInput) {
        return this.productsService.createProduct(createProductInput);
    }

    @Mutation(() => Product) 
    updateProduct(
        @Args('updateProductInput') updateProductInput: UpdateProductInput
    ) {
        this.productsService.updateProduct( updateProductInput);
        return true;
    }

    @Mutation(() => Product)
    deleteProcut(@Args('deleteProductInput') deleteProductInput: DeleteProductInput) {
        return this.productsService.deleteProduct(deleteProductInput.productId);
    }
}