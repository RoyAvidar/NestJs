import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class productOrders1630406470423 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "product-orders",
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
                    name: "orderId",
                    type: "bigInt",
                    unsigned: true,
                },
                {
                    name: "productId",
                    type: "bigint",
                    unsigned: true,
                },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("product-orders");
    }

}
