import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderRest1686057184605 implements MigrationInterface {
    name = 'OrderRest1686057184605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "restaurant" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "restaurant"`);
    }

}
