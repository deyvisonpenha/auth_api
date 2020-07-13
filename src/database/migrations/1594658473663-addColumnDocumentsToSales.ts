import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class addColumnDocumentsToSales1594658473663 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('sales_product', new TableColumn({
        name: 'documents',
        type: 'varchar',
        isNullable: true
      }));
      await queryRunner.addColumn('sales_product', new TableColumn({
        name: 'product_image',
        type: 'varchar',
        isNullable: true
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('sales_product', "documents");
      await queryRunner.dropColumn('sales_product', "product_image");
    }

}
