import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosResolver } from './photos.resolver';
import { PhotosService } from './photos.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([]),
    ],
    providers: [PhotosService, PhotosResolver],
    exports: [],
})
export class PhotosModule {}