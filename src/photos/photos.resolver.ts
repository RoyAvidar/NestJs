import { Resolver } from "@nestjs/graphql";
import { PhotosService } from "./photos.service";

@Resolver()
export class PhotosResolver {
    constructor(private readonly photoService: PhotosService) {}
}