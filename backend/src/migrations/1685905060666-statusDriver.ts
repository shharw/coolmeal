import { MigrationInterface, QueryRunner } from "typeorm";

export class StatusDriver1685905060666 implements MigrationInterface {
    name = 'StatusDriver1685905060666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" ADD "status" character varying NOT NULL DEFAULT 'free'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" DROP COLUMN "status"`);
    }

}
