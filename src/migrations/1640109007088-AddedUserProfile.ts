import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedUserProfile1640109007088 implements MigrationInterface {
    name = 'AddedUserProfile1640109007088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_profile" ("name" character varying, "lastName" character varying, "phoneNumber" integer, "technologies" text array, "git_repos" text array, "profile_id" integer NOT NULL, CONSTRAINT "REL_8c154faf15b98f494723d9cc45" UNIQUE ("profile_id"), CONSTRAINT "PK_8c154faf15b98f494723d9cc45b" PRIMARY KEY ("profile_id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "FK_8c154faf15b98f494723d9cc45b" FOREIGN KEY ("profile_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_8c154faf15b98f494723d9cc45b"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phoneNumber" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastName" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying`);
        await queryRunner.query(`DROP TABLE "user_profile"`);
    }

}
