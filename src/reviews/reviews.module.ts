import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reviews } from "src/entity/reviews.entity";
import { ReviewsService } from "./reviews.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Reviews]),
    ],
    providers: [ReviewsService]
})
export class ReviewsModule{}