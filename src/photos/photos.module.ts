import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { PhotosResolver } from './photos.resolver';
import { PhotosService } from './photos.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    providers: [PhotosResolver, PhotosService]
})
export class PhotosModule {}