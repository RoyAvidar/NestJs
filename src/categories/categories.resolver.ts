import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { GQLCURRENTUSER } from "src/decorators/user.decorator";
import { Category } from "src/entity/category.entity";
import { CategoriesService } from "./categories.service";
import { CreateCategoryInput } from "./dto/input/create-category.input";

@Resolver(() => Category)
export class CategoryResolver {
    constructor(private readonly categoryService: CategoriesService) {}

    @Mutation(() => Category)
    createCategory(@Args('createCategoryInput') createCategoryInput: CreateCategoryInput) {
        return this.categoryService.createCategory(createCategoryInput);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [Category])
    getCategories(@GQLCURRENTUSER() user): Promise<Category[]> {
        return this.categoryService.getCategories();
    }
}