import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reviews } from "src/entity/reviews.entity";
import { UserReview } from "src/entity/user-review.entity";
import { ReviewsResolver } from "./reviews.resolver";
import { ReviewsService } from "./reviews.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Reviews, UserReview]),
    ],
    providers: [ReviewsService, ReviewsResolver]
})
export class ReviewsModule{}