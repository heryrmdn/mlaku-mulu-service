import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entity/role.entity';
import { Glossary } from 'src/glossary/entity/glossary.entity';
import { RolePermission } from 'src/role_permission/entity/role_permission.entity';
import { APP_GUARD } from '@nestjs/core';
import { PermissionGuard } from 'src/auth/permission.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Glossary, RolePermission])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
