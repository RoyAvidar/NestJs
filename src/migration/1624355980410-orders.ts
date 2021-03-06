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
                    name: "orderPrice",
                    type: "float"
                },
                {
                    name: "createdAt",
                    type: "datetime",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "isReady",
                    type: "tinyint",
                    length: "1",
                    default: "0"
                },
                {
                    name: "address",
                    type: "varchar"
                },
                {
                    name: "userId",
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
            ]
        }))
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("orders");
    }

}
