import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { GQLCURRENTUSER } from "src/decorators/user.decorator";
import { Reviews } from "src/entity/reviews.entity";
import { CreateReviewInput } from "./dto/create-review.input";
import { ReviewsService } from "./reviews.service";

@Resolver(() => Reviews)
export class ReviewsResolver {
    constructor(private readonly reviewsService: ReviewsService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => [Reviews])
    getAllReviews(@GQLCURRENTUSER() user) {
        return this.reviewsService.getAllReviews(user);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Reviews)
    createReview(@GQLCURRENTUSER() user, @Args('createReviewInput') createReviewInput: CreateReviewInput) {
        return this.reviewsService.createReview(user, createReviewInput);
    }
}