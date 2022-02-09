import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Reviews } from "src/entity/reviews.entity";
import { UserReview } from "src/entity/user-review.entity";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";
import { CreateReviewInput } from "./dto/create-review.input";
import { UpdateReviewInput } from "./dto/update-review.input";

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
        const reviews = await this.reviewsRepository.find({relations: ["user", "userReview", "userReview.user", "userReview.review"]});
        for (const r of reviews) {
            //boolean if the req user did a like/dislike on a review.
            const userDidiLikeOrDislike = r.userReview.find(userLike => userLike.user.userId == user.userId);
            if (userDidiLikeOrDislike == null) {
                r['userDidLikeOrDislike'] = false;
                r['whatUserActuallyDid'] = null;
            } else {
                r['userDidLikeOrDislike'] = true;
                const userDidiLikeOrDislikeData = await this.userReviewRepository.findOne(userDidiLikeOrDislike, {relations: ["user"]});
                if (userDidiLikeOrDislikeData.likeDislike == true) {
                    r['whatUserActuallyDid'] = true;
                } else {
                    r['whatUserActuallyDid'] = false;
                } // copy this code to the add/removeLike so we set it there insted of reloading the page for the info...
            }
            // r['didLike'] = didiLike;
        }
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

    async updateReviewContent(user: User, updateReviewInput: UpdateReviewInput): Promise<Reviews> {
        const review = await this.reviewsRepository.findOneOrFail(updateReviewInput.reviewId, {relations: ["user"]});
        if (review.user.userId == user.userId) {
            await this.reviewsRepository.update(review.reviewId, {reviewContent: updateReviewInput.reviewContent});
            return review;
        } else {
            throw new Error('You can\'t update or edit another users review..')
        }
    }

    async addReviewLike(reviewId: number, reqUser: User): Promise<Boolean> {
        const review = await this.reviewsRepository.findOneOrFail(reviewId, {relations: ["user", "userReview", "userReview.review", "userReview.user"]});
        if (review.user.userId == reqUser.userId) {
            throw new Error('You can\'t like/dislike your own reviews..');
        } else {
            // if (review.userReview[i].user.userId)
            const userDidLike = review.userReview.find(userLike => userLike.user.userId == reqUser.userId);
            if (!userDidLike) {
                let userReview = await this.userReviewRepository.create();
                userReview.id = userReview.id,
                userReview.review = review,
                userReview.user = reqUser,
                userReview.likeDislike = true,
                await this.userReviewRepository.save(userReview);
            await this.reviewsRepository.update(review.reviewId, {isLike: +review.isLike + 1});
            return true;
            } else {
                throw new Error('You already liked this review.');
            }
            
        }
    }

    async removeReviewLike(reviewId: number, reqUser: User): Promise<Boolean> {
        const review = await this.reviewsRepository.findOneOrFail(reviewId, {relations: ["user", "userReview", "userReview.review", "userReview.user"]});
        const userDidLike = review.userReview.find(userLike => userLike.user.userId == reqUser.userId);
        const userLikeData = await this.userReviewRepository.findOne(userDidLike, {relations: ["user"]});
        if (review.user.userId == reqUser.userId) {
            throw new Error('You can\'t like/dislike your own reviews..');
        } else {
            // console.log(userLikeData.likeDislike);
            // console.log(userLikeData.user.userId);
            if (review.isLike == 0 || userLikeData.likeDislike == false) {
                throw new Error('No like was found to remove');
            }
            await this.reviewsRepository.update(review.reviewId, {isLike: review.isLike -= 1});
            await this.userReviewRepository.remove(userLikeData);
            await review.save();
            return true;
        }
    }

    async addReviewDislike(reviewId: number, reqUser: User): Promise<Boolean> {
        const review = await this.reviewsRepository.findOneOrFail(reviewId, {relations: ["user", "userReview", "userReview.review"]});
        if (review.user.userId == reqUser.userId) {
            throw new Error('You can\'t like/dislike your own reviews..');
        } else {
            const userDidDisLike = review.userReview.find(userLike => userLike.user.userId == reqUser.userId);
            if (!userDidDisLike) {
                let userReview = await this.userReviewRepository.create();
                userReview.id = userReview.id,
                userReview.review = review,
                userReview.user = reqUser,
                userReview.likeDislike = false,
                await this.userReviewRepository.save(userReview); 
                await this.reviewsRepository.update(review.reviewId, {isDislike: review.isDislike + 1});
                return true;
            } else {
                throw new Error('You already liked this review.');
            }
        }
    }

    async removeReviewDislike(reviewId: number, reqUser: User): Promise<Boolean> {
        const review = await this.reviewsRepository.findOneOrFail(reviewId, {relations: ["user", "userReview", "userReview.review"]});
        const userDidDislike = review.userReview.find(userLike => userLike.likeDislike == false);
        const userLikeData = await this.userReviewRepository.findOne(userDidDislike);
        if (review.user.userId == reqUser.userId && userDidDislike.likeDislike == true) {
            throw new Error('You can\'t like/dislike your own reviews..');
        } else {
            if (review.isDislike == 0) {
                throw new Error('No Dislike was found to remove');
            }
            await this.reviewsRepository.update(review.reviewId, {isDislike: review.isDislike -= 1});
            await this.userReviewRepository.remove(userLikeData);
            await review.save();
            return true;
        }
    }
}