import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class address1645013047433 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "address",
            columns: [
                {
                    name: "addressId",
                    type: "bigInt",
                    isGenerated: true,
                    generationStrategy: "increment",
                    isPrimary: true,
                    unsigned: true,
                },
                {
                    name: "city",
                    type: "varchar",
                },
                {
                    name: "streetName",
                    type: "varchar",
                },
                {
                    name: "streetNumber",
                    type: "bigInt",
                },
                {
                    name: "floorNumber",
                    type: "bigInt",
                },
                {
                    name: "apartmentNumber",
                    type: "bigInt",
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
        await queryRunner.dropTable("address");
    }

}
