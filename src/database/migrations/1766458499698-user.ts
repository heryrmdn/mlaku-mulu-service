import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class User1766458499698 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'username',
            type: 'varchar',
            isNullable: true,
            default: null,
          },
          { name: 'name', type: 'varchar', isNullable: true, default: null },
          { name: 'email', type: 'varchar', isNullable: true, default: null },
          {
            name: 'password',
            type: 'varchar',
            isNullable: true,
            default: null,
          },
          { name: 'role_id', type: 'int', isNullable: true, default: null },
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
      'users',
      new TableForeignKey({
        name: 'fk_users_role_id',
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'fk_users_status_id',
        columnNames: ['status_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'glossaries',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'fk_users_role_id');
    await queryRunner.dropForeignKey('users', 'fk_users_status_id');
    await queryRunner.dropTable('users');
  }
}
