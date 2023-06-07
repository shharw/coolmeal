import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1685897177163 implements MigrationInterface {
    name = 'Init1685897177163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "client_name" character varying NOT NULL, "client_phone" character varying NOT NULL, "client_address" character varying NOT NULL, "restaurant_address" character varying NOT NULL, "delivery_price" integer NOT NULL, CONSTRAINT "pk_order_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "balance" integer NOT NULL, "refreshToken" character varying DEFAULT '', CONSTRAINT "pk_user_id" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
