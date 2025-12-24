import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class Tourist1766458500205 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tourists',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar', isNullable: true, default: null },
          { name: 'address', type: 'varchar', isNullable: true, default: null },
          { name: 'email', type: 'varchar', isNullable: true, default: null },
          { name: 'phone', type: 'varchar', isNullable: true, default: null },
          {
            name: 'id_card_number',
            type: 'varchar',
            isNullable: true,
            default: null,
          },
          {
            name: 'passport_number',
            type: 'varchar',
            isNullable: true,
            default: null,
          },
          {
            name: 'birthday',
            type: 'date',
            isNullable: true,
            default: null,
          },
          { name: 'status_id', type: 'int', isNullable: true, default: null },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: true,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
            default: null,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'tourists',
      new TableForeignKey({
        name: 'fk_tourists_status_id',
        columnNames: ['status_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'glossaries',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tourists', 'fk_tourists_status_id');
    await queryRunner.dropTable('tourists');
  }
}
