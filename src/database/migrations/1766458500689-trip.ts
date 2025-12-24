import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class Trip1766458500689 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'trips',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'tourist_id', type: 'int', isNullable: true, default: null },
          {
            name: 'start_date',
            type: 'timestamp',
            isNullable: true,
            default: null,
          },
          {
            name: 'end_date',
            type: 'timestamp',
            isNullable: true,
            default: null,
          },
          {
            name: 'destination',
            type: 'varchar',
            isNullable: true,
            default: null,
          },
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
      'trips',
      new TableForeignKey({
        name: 'fk_trips_tourist_id',
        columnNames: ['tourist_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tourists',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('trips', 'fk_trips_tourist_id');
    await queryRunner.dropTable('trips');
  }
}
