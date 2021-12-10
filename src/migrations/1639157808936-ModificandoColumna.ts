import {MigrationInterface, QueryRunner} from "typeorm";

export class ModificandoColumna1639157808936 implements MigrationInterface {
    name = 'ModificandoColumna1639157808936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "phoneNumber" TO "phoneNumber2"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "phoneNumber2" TO "phoneNumber"`);
    }

}
