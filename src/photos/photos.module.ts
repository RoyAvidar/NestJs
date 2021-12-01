import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosResolver } from './photos.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([]),
    ],
    providers: [PhotosResolver]
})
export class PhotosModule {}