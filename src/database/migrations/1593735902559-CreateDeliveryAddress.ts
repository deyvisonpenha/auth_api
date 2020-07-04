import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class CreateDeliveryAddress1593735902559 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'delivery_address',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'address',
              type: 'varchar'
            },
            {
              name: 'description',
              type: 'varchar'
            },
            {
              name: 'user_id',
              type: 'uuid',
              isNullable: false
            },
            {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
          ]
        })
      );

      await queryRunner.createForeignKey(
        'delivery_address',
        new TableForeignKey({
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          name: 'user_address',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('delivery_address', 'user_address')
      await queryRunner.dropTable('delivery_address')
    }

}
