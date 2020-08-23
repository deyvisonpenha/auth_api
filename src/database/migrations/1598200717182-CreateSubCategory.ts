import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateSubCategory1598200717182 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable( new Table({
        name: 'subCategories',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: "name",
            type: 'varchar'
          },
          {
            name: 'category_id',
            type: 'varchar'
          },
          {
            name: 'shop_id',
            type: 'varchar'
          },
          {
            name: 'description',
            type: 'varchar'
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
