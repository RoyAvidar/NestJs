import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { GetProductArgs } from "./dto/args/get-product.args";
import { CreateProductInput } from "./dto/input/create-product.input";
import { DeleteProductInput } from "./dto/input/delete-product.input";
import { UpdateProductInput } from "./dto/input/update-product.input";
import { Product } from "../entity/product.entity";
import { ProductsService } from "./products.service";
import { GetProductsArgs } from "./dto/args/get-products.args";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { GQLCURRENTUSER } from "src/decorators/user.decorator";
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Resolver(() => Product)
export class ProductsResolver {
    constructor(private readonly productsService: ProductsService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => Product)
    getSingleProduct(@Args() getProductArgs: GetProductArgs) {
        return this.productsService.getProduct(getProductArgs);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [Product])
    getUserProducts(@GQLCURRENTUSER() user) {
        return this.productsService.getUserProducts(user);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [Product], {name: 'products', nullable: 'items'})
    getProducts(@GQLCURRENTUSER() user) {
        return this.productsService.getProucts();
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [Product])
    getProductsByCategory(@Args('categoryId') categoryId: number) {
        return this.productsService.getProductsByCategory(categoryId);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Product)
    createProduct(@GQLCURRENTUSER() user, @Args('createProductInput') createProductInput: CreateProductInput, @Args({name: 'file', type: () => GraphQLUpload})
    {
        createReadStream,
        filename
    }: FileUpload) {
        return this.productsService.createProduct(user, createProductInput, { createReadStream, filename });
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Product)
    updateProduct(@GQLCURRENTUSER() user, @Args('updateProductData') updateProductData: UpdateProductInput, @Args('prodId') prodId: number) {
        return this.productsService.updateProduct(user, updateProductData, prodId);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    deleteProduct(@GQLCURRENTUSER() user, @Args('deleteProductData') deleteProductData: DeleteProductInput) {
        return this.productsService.deleteProduct(user, deleteProductData);
    }
}