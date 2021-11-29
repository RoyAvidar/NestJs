import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UsersModule } from 'src/users/users.module';
import { PhotosResolver } from './photos.resolver';
import { PhotosService } from './photos.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        UsersModule,
    ],
    providers: [PhotosService, PhotosResolver],
    exports: [],
})
export class PhotosModule {}