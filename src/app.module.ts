import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlossaryModule } from './glossary/glossary.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { RolePermissionModule } from './role_permission/role_permission.module';
import { UserModule } from './user/user.module';
import { TouristModule } from './tourist/tourist.module';
import { TripModule } from './trip/trip.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT!, 3306),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
      migrationsRun: false,
      migrationsTableName: 'migrations',
      timezone: 'Z'
    }),
    GlossaryModule,
    RoleModule,
    PermissionModule,
    RolePermissionModule,
    UserModule,
    TouristModule,
    TripModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
