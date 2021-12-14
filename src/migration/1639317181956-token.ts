import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class token1639317181956 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "token",
            columns: [
                {
                    name: "tokenId",
                    type: "varchar",
                    isGenerated: true,
                    generationStrategy: "uuid",
                    isPrimary: true,
                },
                {
                    name: "expireDate",
                    type: "datetime",
                    default: "CURRENT_TIMESTAMP"
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
        await queryRunner.dropTable("token");
    }

}
