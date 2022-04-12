import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entity/category.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/input/create-category.input';
import { UpdateCategoryInput } from './dto/input/update-category.input';

@Injectable()
export class CategoriesService {
    constructor( 
    @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    async createCategory(createCategoryInput: CreateCategoryInput): Promise<Category> {
        const newCategory = this.categoryRepository.create(createCategoryInput);
        await this.categoryRepository.insert(newCategory);
        return newCategory;
    }

    async getCategory(categoryId: string|number): Promise<Category> {
        const cat = await this.categoryRepository.findOneOrFail(categoryId);
        return cat;
    }

    async getCategories(): Promise<Category[]> {
        const categorieslist = await this.categoryRepository.find();
        return categorieslist;
    }

    async updateCategory(user: User, updateCategoryInput: UpdateCategoryInput): Promise<Boolean> {
        if (!user.isAdmin) {
            throw new UnauthorizedException();
        }
        var oldCategory = await this.categoryRepository.findOneOrFail(updateCategoryInput.categoryId);
        if (oldCategory.categoryId == updateCategoryInput.categoryId) {
            oldCategory.categoryName = updateCategoryInput.categoryName;
            oldCategory.categoryIcon = updateCategoryInput.categoryIcon;
            await oldCategory.save();
            return true;
        }
        return false;
    }

    async deleteCategory(user: User, categoryId: string|number): Promise<Boolean> {
        if (!user.isAdmin) {
            throw new UnauthorizedException();
        }
        var category = await this.categoryRepository.findOneOrFail(categoryId);
        await this.categoryRepository.delete(category);
        return true;
    }
}