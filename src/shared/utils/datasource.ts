import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv'
dotenv.config()

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT!, 3306),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/../../database/migrations/**/*{.ts,.js}'],
  migrationsRun: false,
  migrationsTableName: 'migrations',
  timezone: 'Z'
});
