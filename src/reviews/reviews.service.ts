import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Reviews } from "src/entity/reviews.entity";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";
import { CreateReviewInput } from "./dto/create-review.input";

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Reviews)
        private reviewsRepository: Repository<Reviews>,
    ) {}

    async getAllReviews(user: User): Promise<Reviews[]> {
        if (!user) {
            throw new UnauthorizedException();
        }
        const reviews = await this.reviewsRepository.find({relations: ["user"]});
        return reviews;
    }

    async createReview(user: User, createReviewInput: CreateReviewInput): Promise<Reviews> {
        if (!user) {
            throw new UnauthorizedException();
        }
        let newReview = this.reviewsRepository.create();
        newReview.reviewContent = createReviewInput.reviewContent;
        newReview.user = user;
        newReview = await newReview.save();
        return newReview;
    }

    async addReviewLike(reviewId: number, reqUser: User): Promise<Boolean> {
        const review = await this.reviewsRepository.findOneOrFail(reviewId, {relations: ["user"]});
        if (review.user.userId == reqUser.userId) {
            return false;
        } else {
            review.isLike += 1;
            await review.save();
            return true;
        }
    }

    async removeReviewLike(reviewId: number, reqUser: User): Promise<Boolean> {
        const review = await this.reviewsRepository.findOneOrFail(reviewId, {relations: ["user"]});
        if (review.user.userId == reqUser.userId) {
            return false;
        } else {
            if (review.isLike == 0) {
                return false;
            }
            review.isLike -= 1;
            await review.save();
            return true;
        }
    }

    async addReviewDislike(reviewId: number, reqUser: User): Promise<Boolean> {
        const review = await this.reviewsRepository.findOneOrFail(reviewId, {relations: ["user"]});
        if (review.user.userId == reqUser.userId) {
            return false;
        } else {
            review.isDislike += 1;
            await review.save();
            return true;
        }
    }

    async removeReviewDislike(reviewId: number, reqUser: User): Promise<Boolean> {
        const review = await this.reviewsRepository.findOneOrFail(reviewId, {relations: ["user"]});
        if (review.user.userId == reqUser.userId) {
            return false;
        } else {
            if (review.isDislike == 0) {
                return false;
            }
            review.isDislike -= 1;
            await review.save();
            return true;
        }
    }
}