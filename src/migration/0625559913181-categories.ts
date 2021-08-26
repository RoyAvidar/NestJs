import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class categories0625559913181 implements MigrationInterface {

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
                },
                {
                    name: "products",
                    type: "product"
                }
            ],
            foreignKeys: [
                {
                    columnNames: ["products"],
                    referencedColumnNames: ["products"],
                    referencedTableName: "products",
                    onDelete: "CASCADE"
                }
            ]
            
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("categories");
    }

}
