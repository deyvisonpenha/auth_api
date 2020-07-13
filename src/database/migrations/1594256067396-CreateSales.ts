import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateSales1594256067396 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
        new Table({
          name: 'sales_product',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'shop_id',
              type: 'decimal',
              precision: 10,
              isNullable: false
            },
            {
              name: 'user_id',
              type: 'varchar',
              isNullable: false
            },
            {
              name: 'total',
              type: 'varchar',
            },
            {
              name: 'shop_amount',
              type: 'varchar',
            },
            {
              name: 'deliver_fee',
              type: 'varchar',
            },
            {
              name: 'paid',
              type: 'decimal',
              precision: 10,
            },
            {
              name: 'cancelled',
              type: 'decimal',
              precision: 10,
            },
            {
              name: 'deliveried',
              type: 'decimal',
              precision: 10,
            },
            {
              name: 'status',
              type: 'varchar',
            },
            {
              name: 'observations',
              type: 'varchar',
            },
            {
              name: 'address_id',
              type: 'decimal',
              precision: 10,
            },
            {
              name: 'payment_type_id',
              type: 'decimal',
              precision: 10,
            },
            {
              name: 'finished',
              type: 'decimal',
              precision: 10,
            },
            {
              name: 'delivery_tax',
              type: 'varchar',
            },
            {
              name: 'type_delivery',
              type: 'varchar',
            },
            {
              name: 'troco',
              type: 'varchar',
            },
            {
              name: 'cashback_value',
              type: 'varchar',
            },
            {
              name: 'products',
              type: 'varchar[]',
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('sales_product')
    }

}
