import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class userOrders1631523829520 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user-orders",
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
                    name: "orderId",
                    type: "bigInt"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user-orders");
    }

}
