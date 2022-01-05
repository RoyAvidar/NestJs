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
}