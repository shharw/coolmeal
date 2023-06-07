import { MigrationInterface, QueryRunner } from "typeorm";

export class Relation1685898458705 implements MigrationInterface {
    name = 'Relation1685898458705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "driverId" uuid`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_8cbf856839ddca842f21b804a91" FOREIGN KEY ("driverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_8cbf856839ddca842f21b804a91"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "driverId"`);
    }

}
