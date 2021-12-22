import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedRole1640195077110 implements MigrationInterface {
    name = 'AddedRole1640195077110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "roles" text array NOT NULL DEFAULT '{user}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`);
    }

}
