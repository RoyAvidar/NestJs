import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class reviews1641387259419 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "reviews",
            columns: [
                {
                    name: "reviewId",
                    type: "bigInt",
                    isGenerated: true,
                    isPrimary: true,
                    generationStrategy: "increment",
                    unsigned: true,
                },
                {
                    name: "reviewContent",
                    type: "varchar"
                },
                {
                    name: "userId",
                    type: "bigInt",
                    unsigned: true
                },
                {
                    name: "isLike",
                    type: "tinyint",
                    length: "1",
                    default: "0"
                },
                {
                    name: "isDislike",
                    type: "tinyint",
                    length: "1",
                    default: "0"
                }
            ],
            foreignKeys: [
                {
                    columnNames: ["userId"],
                    referencedColumnNames: ["userId"],
                    referencedTableName: "users",
                    onDelete: "CASCADE"
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("reviews")
    }

}
