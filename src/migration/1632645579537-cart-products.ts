import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class cartProducts1632645579537 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "cart-products",
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
                    name: "cartId",
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
        await queryRunner.dropTable("cart-products");
    }

}
