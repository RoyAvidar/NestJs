import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import * as fs from 'fs';
import * as path from 'path';
import {v4 as uuidv4} from 'uuid';
import { Product } from 'src/entity/product.entity';

@Injectable()
export class PhotosService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async uploadFile(user: User, {createReadStream, filename}: FileUpload): Promise<Boolean> {
        const realUser = await this.userRepository.findOneOrFail(user.userId);
        // get the fileName and split it so we have only the .png/.jpg
        var newFileName = filename.split(".");
        // give the fileName a uuid ID so that we have a 00001.png name etc..
        newFileName = uuidv4() + '.' + newFileName[1];
        // make sure that the user doesn't have a profilePic
        // if (realUser.userProfilePic != null ) {
        //     return false;
        // // }
        // set the userProfilePic to the new fileName
        realUser.userProfilePic = newFileName;
        await realUser.save();
        await new Promise(async (resolve, reject) => 
            createReadStream()
                .pipe(fs.createWriteStream(`./user-uploads/${newFileName}`)) //the new file name with the uuid.png..
                .on('finish', () => resolve(true))
                .on('error', () => reject(false))
        );
        return true;
    }

    async deleteUserProfileImageFile(user: User): Promise<Boolean> {
        const confirmedUser = await this.userRepository.findOneOrFail(user.userId);
        if (!confirmedUser.userProfilePic) {
            throw new Error('User doesn\'t has a ProfileImage');
        }
        fs.unlink(path.join(`./user-uploads/`, confirmedUser.userProfilePic), err => {
            if (err) throw err;
        });
        confirmedUser.userProfilePic = null;
        await confirmedUser.save();
        return true;
    }

    async deleteProductImageFile(product: Product): Promise<Boolean> {
        // const confirmedProduct = await this.productRepository.findOneOrFail(product.prodId);
        //  if (!confirmedUser.userProfilePic) {
            // throw new Error('Product doesn\'t have a ProfileImage');
        // }
        // fs.readdir(`./product-uploads/${confirmedProduct.imageUrl}`, (err, files) => {
        //     if (err) throw err;

        //     for (const file of files) {
        //         fs.unlink(path.join(`./product-uploads/`, file), err => {
        //             if (err) throw err;
        //         });
        //     }
        // });
        return true;
    }

    async getProfilePic(user: User): Promise<string> {
        const realUser = await this.userRepository.findOneOrFail(user.userId);
        return realUser.userProfilePic;
    }
}