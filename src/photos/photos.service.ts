import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';

@Injectable()
export class PhotosService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async uploadFile(user: User, {createReadStream, filename}: FileUpload): Promise<boolean> {
        const realUser = await this.userRepository.findOneOrFail(user.userId);
        // get the fileName and split it so we have only the .png/.jpg
        // give the fileName a uuid ID so that we have a 00001.png etc
        // realUser.userProfilePic = filename; 
        // updateUser = await this.userRepository.update(realUser); 
        return new Promise(async (resolve, reject) => 
            createReadStream()
                .pipe(createWriteStream(`./uploads/${filename}`)) //the new file name with the uuid.png..
                .on('finish', () => resolve(true))
                .on('error', () => reject(false))
        );
    }
}