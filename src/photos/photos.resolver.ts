import { GraphQLUpload, FileUpload } from "graphql-upload";
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { GQLCURRENTUSER } from "src/decorators/user.decorator";
import { PhotosService } from "./photos.service";
import { createWriteStream } from 'fs';


@Resolver()
export class PhotosResolver {
    constructor(private readonly photoService: PhotosService) {}

    // @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    async uploadFile(@Args({name: 'file', type: () => GraphQLUpload})
    {
        createReadStream,
        filename
    }: FileUpload): Promise<boolean> {
        return new Promise(async (resolve, reject) => 
        createReadStream()
            .pipe(createWriteStream(`./uploads/${filename}`))
            .on('finish', () => resolve(true))
            .on('error', () => reject(false))
        );
    }
}