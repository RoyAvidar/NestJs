import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { PhotosService } from './photos.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GQLCURRENTUSER } from 'src/decorators/user.decorator';
import { Product } from 'src/entity/product.entity';

@Resolver()
export class PhotosResolver {

    constructor(private readonly photosService: PhotosService) {}

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    async uploadFile(@GQLCURRENTUSER() user, @Args({name: 'file', type: () => GraphQLUpload})
    {
        createReadStream,
        filename
    }: FileUpload) {
        return this.photosService.uploadFile(user, {createReadStream, filename});
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => String)
    async getUserProfilePic(@GQLCURRENTUSER() user) {
        return this.photosService.getProfilePic(user);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    async deleteUserProfileImageFile(@GQLCURRENTUSER() user) {
        return this.photosService.deleteUserProfileImageFile(user);
    }
}