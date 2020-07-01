import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class CreateBuySomething1593593786448 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'buysomething',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
            name: 'address_to_buy',
            type: 'varchar',
            isNullable: false
            },
            {
            name: 'product_description',
            type: 'varchar',
            isNullable: false
            },
            {
            name: 'image',
            type: 'varchar',
            isNullable: false
            },
            {
            name: 'total_value',
            type: 'varchar',
            isNullable: false
            },
            {
            name: 'distance',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false
            },
            {
            name: 'service_charge',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false
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
        'buysomething',
        new TableForeignKey({
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          name: 'buySomethingUsers',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('buysomething', 'buySomethingUsers')
      await queryRunner.dropTable('buysomething')
    }

}
