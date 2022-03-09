import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { GQLCURRENTUSER } from "src/decorators/user.decorator";
import { Category } from "src/entity/category.entity";
import { CategoriesService } from "./categories.service";
import { CreateCategoryInput } from "./dto/input/create-category.input";
import { UpdateCategoryInput } from "./dto/input/update-category.input";

@Resolver(() => Category)
export class CategoryResolver {
    constructor(private readonly categoryService: CategoriesService) {}

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Category)
    createCategory(@Args('createCategoryInput') createCategoryInput: CreateCategoryInput) {
        return this.categoryService.createCategory(createCategoryInput);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Category)
    getCategory(@Args('categoryId') categoryId: string) {
        return this.categoryService.getCategory(categoryId);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [Category])
    getCategories(@GQLCURRENTUSER() user): Promise<Category[]> {
        return this.categoryService.getCategories();
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    updateCategory(@GQLCURRENTUSER() user, @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput) {
        return this.categoryService.updateCategory(user, updateCategoryInput);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    deleteCategory(@GQLCURRENTUSER() user, @Args('categoryId') categoryId: string) {
        return this.categoryService.deleteCategory(user, categoryId);
    }
}