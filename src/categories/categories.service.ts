import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entity/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/input/create-category.input';

@Injectable()
export class CategoriesService {
    constructor( 
    @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    public createCategory(createCategoryInput: CreateCategoryInput) {
        const newCategory = this.categoryRepository.create(createCategoryInput);
        return this.categoryRepository.insert(newCategory);
    }

    async getCategory(categoryId: string): Promise<Category> {
        const cat = await this.categoryRepository.findOneOrFail(categoryId);
        return cat;
    }
}