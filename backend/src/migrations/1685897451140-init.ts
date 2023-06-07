import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1685897451140 implements MigrationInterface {
    name = 'Init1685897451140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "status" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "status"`);
    }

}
