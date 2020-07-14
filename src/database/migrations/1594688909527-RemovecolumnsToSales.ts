import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class RemovecolumnsToSales1594688909527 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('sales_product', "product_image");
      await queryRunner.dropColumn('sales_product', "description");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('sales_product', new TableColumn({
        name: "product_image",
        type: "varchar"
      }));

      await queryRunner.addColumn('sales_product', new TableColumn({
        name: "description",
        type: "varchar"
      }))
    }

}
