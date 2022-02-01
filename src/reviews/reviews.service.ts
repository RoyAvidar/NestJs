import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Reviews } from "src/entity/reviews.entity";
import { UserReview } from "src/entity/user-review.entity";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";
import { CreateReviewInput } from "./dto/create-review.input";

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Reviews)
        private reviewsRepository: Repository<Reviews>,
        @InjectRepository(UserReview)
        private userReviewRepository: Repository<UserReview>
    ) {}

    async getAllReviews(user: User): Promise<Reviews[]> {
        if (!user) {
            throw new UnauthorizedException();
        }
        const reviews = await this.reviewsRepository.find({relations: ["user"]});
        return reviews;
    }

    async getReviewLikes(reviewId: number): Promise<number> {
        const review = await this.reviewsRepository.findOne(reviewId);
        return review.isLike;
    }

    async getReviewDisLikes(reviewId: number): Promise<number> {
        const review = await this.reviewsRepository.findOne(reviewId);
        return review.isDislike;
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
        const review = await this.reviewsRepository.findOneOrFail(reviewId, {relations: ["user", "userReview", "userReview.review"]});
        if (review.user.userId == reqUser.userId) {
            throw new Error('You can\'t like/dislike your own reviews..');
        } else {
            let userReview = await this.userReviewRepository.create();
            await this.userReviewRepository.save({
                id: userReview.id,
                likeDislike: true,
                review: review,
                user: reqUser,
            });
            await this.reviewsRepository.update(review.reviewId, {isLike: +review.isLike + 1});
            return true;
        }
    }

    async removeReviewLike(reviewId: number, reqUser: User): Promise<Boolean> {
        const review = await this.reviewsRepository.findOneOrFail(reviewId, {relations: ["user", "userReview", "userReview.review"]});
        const userDidLike = review.userReview.find(userLike => userLike.likeDislike == true);
        const userLikeData = await this.userReviewRepository.findOne(userDidLike);
        if (review.user.userId == reqUser.userId && userDidLike.likeDislike == false) {
            throw new Error('You can\'t like/dislike your own reviews..');
        } else {
            if (review.isLike == 0) {
                return false;
            }
            await this.reviewsRepository.update(review.reviewId, {isLike: review.isLike -= 1});
            await this.userReviewRepository.remove(userLikeData);
            await review.save();
            return true;
        }
    }

    async addReviewDislike(reviewId: number, reqUser: User): Promise<Boolean> {
        const review = await this.reviewsRepository.findOneOrFail(reviewId, {relations: ["user", "userReview", "userReview.review", "userReview.likeDislike"]});
        if (review.user.userId == reqUser.userId) {
            return false;
        } else {
            let userReview = await this.userReviewRepository.create();
            userReview.user = reqUser;
            userReview.review = review;
            userReview.likeDislike = false;
            await this.userReviewRepository.save(userReview);
            await this.reviewsRepository.update(review.reviewId, {isDislike: review.isDislike + 1});
            await this.reviewsRepository.save(review);
            return true;
        }
    }

    async removeReviewDislike(reviewId: number, reqUser: User): Promise<Boolean> {
        const review = await this.reviewsRepository.findOneOrFail(reviewId, {relations: ["user", "userReview", "userReview.review", "userReview.likeDislike"]});
        const userDidDislike = review.userReview.find(userLike => userLike.likeDislike == false);
        if (review.user.userId == reqUser.userId && userDidDislike.likeDislike == true) {
            return false;
        } else {
            if (review.isDislike == 0) {
                return false;
            }
            await this.reviewsRepository.update(review.reviewId, {isDislike: review.isDislike -= 1});
            await this.userReviewRepository.remove(userDidDislike);
            await review.save();
            return true;
        }
    }
}