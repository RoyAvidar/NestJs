import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class userReview1643713861167 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user-review",
            columns: [
                {
                    name: "id",
                    type: "bigInt",
                    isGenerated: true,
                    generationStrategy: "increment",
                    isPrimary: true,
                    unsigned: true,
                },
                {
                    name: "userId",
                    type: "bigint",
                    unsigned: true,
                },
                {
                    name: "reviewId",
                    type: "bigint",
                    unsigned: true,
                },
                {
                    name: "likeDislike",
                    type: "tinyint",
                    length: "1",
                    isNullable: true,
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user-review");
    }

}
