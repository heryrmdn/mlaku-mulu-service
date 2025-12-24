import { Module } from '@nestjs/common';
import { RolePermissionController } from './role_permission.controller';
import { RolePermissionService } from './role_permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from './entity/role_permission.entity';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermission])],
  controllers: [RolePermissionController],
  providers: [RolePermissionService],
  exports: [RolePermissionService],
})
export class RolePermissionModule {}
