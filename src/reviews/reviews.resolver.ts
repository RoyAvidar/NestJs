import { Resolver } from "@nestjs/graphql";
import { Reviews } from "src/entity/reviews.entity";
import { ReviewsService } from "./reviews.service";

@Resolver(() => Reviews)
export class ReviewsResolver {
    constructor(private readonly reviewsService: ReviewsService) {}
}