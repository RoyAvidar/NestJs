import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class orders1624355980410 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "orders",
            columns: [
                {
                    name: "orderId",
                    type: "bigInt",
                    isGenerated: true,
                    generationStrategy: "increment",
                    isPrimary: true,
                    unsigned: true,
                },
                {
                    name: "orderName",
                    type: "varchar"
                },
                {
                    name: "orderPrice",
                    type: "float"
                },
                {
                    name: "createdAt",
                    type: "date"
                },
                {
                    name: "userId",
                    type: "bigInt",
                    unsigned: true
                },
                {
                    name: "productId",
                    type: "bigInt",
                    unsigned: true
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
        }))
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("orders");
    }

}
