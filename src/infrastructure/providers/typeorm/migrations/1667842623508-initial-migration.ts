import { MigrationInterface, QueryRunner } from 'typeorm'

export class initialMigration1667842623508 implements MigrationInterface {
    name = 'initialMigration1667842623508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "stock" ("id" SERIAL NOT NULL, "price" integer NOT NULL, "marketDate" TIMESTAMP NOT NULL, "companyId" integer, CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))')
        await queryRunner.query('CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "foundationDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))')
        await queryRunner.query('ALTER TABLE "stock" ADD CONSTRAINT "FK_ae5da2f38f2ce30acf72ec3270e" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "stock" DROP CONSTRAINT "FK_ae5da2f38f2ce30acf72ec3270e"')
        await queryRunner.query('DROP TABLE "company"')
        await queryRunner.query('DROP TABLE "stock"')
    }

}
