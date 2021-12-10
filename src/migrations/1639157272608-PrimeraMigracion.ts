import {MigrationInterface, QueryRunner} from "typeorm";

export class PrimeraMigracion1639157272608 implements MigrationInterface {
    name = 'PrimeraMigracion1639157272608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "name" character varying, "lastName" character varying, "phoneNumber" integer, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work-time-logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hours" smallint NOT NULL, "date" date NOT NULL, "user_id" integer NOT NULL, "project_id" integer NOT NULL, CONSTRAINT "PK_a22a28169a31ebb39569f5003b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" SERIAL NOT NULL, "key" character varying(16) NOT NULL, "title" character varying(80) NOT NULL, "description" text NOT NULL, "planned_hours" integer NOT NULL, CONSTRAINT "UQ_63e67599567b2126cfef14e1474" UNIQUE ("key"), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id")); COMMENT ON COLUMN "projects"."key" IS 'Key unica del proyecto'; COMMENT ON COLUMN "projects"."title" IS 'Titulo del proyecto'`);
        await queryRunner.query(`ALTER TABLE "work-time-logs" ADD CONSTRAINT "FK_901ebd93779803ce70d4ebc429c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "work-time-logs" ADD CONSTRAINT "FK_7a646e050d0891990981f045f74" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work-time-logs" DROP CONSTRAINT "FK_7a646e050d0891990981f045f74"`);
        await queryRunner.query(`ALTER TABLE "work-time-logs" DROP CONSTRAINT "FK_901ebd93779803ce70d4ebc429c"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "work-time-logs"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
