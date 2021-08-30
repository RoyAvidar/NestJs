import { Args, Mutation, Resolver } from "@nestjs/graphql";
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
}