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
                    type: "bigInt",
                    unsigned: true,
                },
                {
                    name: "productId",
                    type: "bigInt",
                    unsigned: true,
                },
            ],
            foreignKeys: [
                {
                    columnNames: ["userId"],
                    referencedColumnNames: ["userId"],
                    referencedTableName: "users",
                    onDelete: "CASCADE"
                },
                {
                    columnNames: ["productId"],
                    referencedColumnNames: ["productId"],
                    referencedTableName: "products",
                    onDelete: "CASCADE"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user-products");
    }

}
