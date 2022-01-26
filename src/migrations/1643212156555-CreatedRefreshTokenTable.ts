import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatedRefreshTokenTable1643212156555 implements MigrationInterface {
    name = 'CreatedRefreshTokenTable1643212156555'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refresh_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_revoked" boolean NOT NULL, "expires" TIMESTAMP NOT NULL, "user" integer NOT NULL, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_863e3ed28a790ed79d16fc50329" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_863e3ed28a790ed79d16fc50329"`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
    }

}
