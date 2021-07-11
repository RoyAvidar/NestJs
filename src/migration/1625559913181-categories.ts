import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class categories1625559913181 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "categories",
            columns: [
                {
                    name: "categoryId",
                    type: "bigInt",
                    isGenerated: true,
                    generationStrategy: "increment",
                    isPrimary: true,
                    unsigned: true,
                },
                {
                    name: "categoryName",
                    type: "varchar"
                }
            ],
            foreignKeys: [
                {
                    columnNames: ['productId'],
                    referencedColumnNames: ['productId'],
                    referencedTableName: 'products',
                    onDelete: "CASCADE"
                },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("categories");
    }

}
