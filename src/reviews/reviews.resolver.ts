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

    @UseGuards(GqlAuthGuard)
    @Query(() => Number)
    getReviewLikes(@Args('reviewId') reviewId: number) {
        return this.reviewsService.getReviewLikes(reviewId);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Number)
    getReviewDisLikes(@Args('reviewId') reviewId: number) {
        return this.reviewsService.getReviewDisLikes(reviewId);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    addReviewLike(@Args('reviewId') reviewId: number, @GQLCURRENTUSER() user) {
        return this.reviewsService.addReviewLike(reviewId, user);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    removeReviewLike(@Args('reviewId') reviewId: number, @GQLCURRENTUSER() user) {
        return this.reviewsService.removeReviewLike(reviewId, user);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    addReviewDislike(@Args('reviewId') reviewId: number, @GQLCURRENTUSER() user) {
        return this.reviewsService.addReviewDislike(reviewId, user);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    removeReviewDislike(@Args('reviewId') reviewId: number, @GQLCURRENTUSER() user) {
        return this.reviewsService.removeReviewDislike(reviewId, user);
    }
}