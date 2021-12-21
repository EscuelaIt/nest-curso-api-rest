import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedManyToMany1640112831067 implements MigrationInterface {
    name = 'AddedManyToMany1640112831067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project_category" ("projectId" integer NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_f9ce2c2da01ed368fa7ca095f31" PRIMARY KEY ("projectId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1d5cb5254bc78e09cb3cbde123" ON "project_category" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_37ecc11e0897c93df535771a9d" ON "project_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "project_category" ADD CONSTRAINT "FK_1d5cb5254bc78e09cb3cbde123d" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_category" ADD CONSTRAINT "FK_37ecc11e0897c93df535771a9de" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_category" DROP CONSTRAINT "FK_37ecc11e0897c93df535771a9de"`);
        await queryRunner.query(`ALTER TABLE "project_category" DROP CONSTRAINT "FK_1d5cb5254bc78e09cb3cbde123d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_37ecc11e0897c93df535771a9d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1d5cb5254bc78e09cb3cbde123"`);
        await queryRunner.query(`DROP TABLE "project_category"`);
    }

}
