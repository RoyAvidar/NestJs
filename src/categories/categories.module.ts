import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { Category } from '../entity/category.entity';
import { CategoryResolver } from './categories.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([Category]),
    ],
    providers: [CategoriesService, CategoryResolver],
})
export class CategoriesModule {}