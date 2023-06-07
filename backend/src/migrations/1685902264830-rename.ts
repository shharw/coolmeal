import { MigrationInterface, QueryRunner } from "typeorm";

export class Rename1685902264830 implements MigrationInterface {
    name = 'Rename1685902264830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "driver" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "balance" integer NOT NULL, "refreshToken" character varying DEFAULT '', CONSTRAINT "pk_driver_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_8cbf856839ddca842f21b804a91" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_8cbf856839ddca842f21b804a91"`);
        await queryRunner.query(`DROP TABLE "driver"`);
    }

}
