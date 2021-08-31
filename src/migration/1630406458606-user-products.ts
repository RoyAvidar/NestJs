import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class userProducts1630406458606 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user-products",
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
                    type: "bigInt"
                },
                {
                    name: "productId",
                    type: "bigInt"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user-products");
    }

}
