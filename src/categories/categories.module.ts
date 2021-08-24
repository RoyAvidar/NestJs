import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { Category } from './models/category.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Category]),
    ],
    providers: [CategoriesService],
})
export class CategoriesModule {}