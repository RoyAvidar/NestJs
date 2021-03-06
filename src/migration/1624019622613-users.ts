import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class users1624019622613 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "userId",
                    type: "bigInt",
                    isGenerated: true,
                    generationStrategy: "increment",
                    isPrimary: true,
                    unsigned: true,
                },
                {
                    name: "userName",
                    type: "varchar",
                },
                {
                    name: "userLastName",
                    type: "varchar",
                },
                {
                    name: "userEmail",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "userPassword",
                    type: "varchar",
                },
                {
                    name: "userPhone",
                    type: "varchar",
                },
                {
                    name: "userProfilePic",
                    type: "varchar",
                },
                {
                    name: "isAdmin",
                    type: "tinyint",
                    length: "1",
                    default: "0"
                },
                {
                    name: "isDarkMode",
                    type: "tinyint",
                    length: "1",
                    default: "0"
                }
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
