import { MigrationInterface, QueryRunner } from "typeorm";

export class DriverPhone1685957011089 implements MigrationInterface {
    name = 'DriverPhone1685957011089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" ADD "phone_number" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "driver" DROP COLUMN "phone_number"`);
    }

}
