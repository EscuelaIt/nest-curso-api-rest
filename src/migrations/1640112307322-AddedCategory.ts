import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedCategory1640112307322 implements MigrationInterface {
    name = 'AddedCategory1640112307322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_8c154faf15b98f494723d9cc45b"`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "UQ_8c154faf15b98f494723d9cc45b" UNIQUE ("profile_id")`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "FK_8c154faf15b98f494723d9cc45b" FOREIGN KEY ("profile_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_8c154faf15b98f494723d9cc45b"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "UQ_8c154faf15b98f494723d9cc45b"`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "FK_8c154faf15b98f494723d9cc45b" FOREIGN KEY ("profile_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
