import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedUserIdInProject1639766431915 implements MigrationInterface {
    name = 'AddedUserIdInProject1639766431915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_bd55b203eb9f92b0c8390380010" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_bd55b203eb9f92b0c8390380010"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "user_id"`);
    }

}
