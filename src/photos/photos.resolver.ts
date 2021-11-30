import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { GQLCURRENTUSER } from "src/decorators/user.decorator";
import { PhotosService } from "./photos.service";

@Resolver()
export class PhotosResolver {
    constructor(private readonly photoService: PhotosService) {}

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    async uploadFile(@GQLCURRENTUSER() user, @Args({name: 'file', type: () => GraphQLUpload})
    {
        createReadStream,
        filename
    }: FileUpload): Promise<boolean> {
        return this.photoService.getImageFromCamera(filename);
    }
}