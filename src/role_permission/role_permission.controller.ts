import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RolePermissionService } from './role_permission.service';
import { RolePermission } from './entity/role_permission.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { ResponseInterceptor } from 'src/response/response.interceptor';
import { Permission as PermissionUtil } from 'src/shared/utils/permission';
import { Permission } from 'src/auth/permission.decorator';
import { PermissionGuard } from 'src/auth/permission.guard';

@Controller('role_permission')
@UseInterceptors(ResponseInterceptor)
export class RolePermissionController {
  constructor(private readonly rolePermissionService: RolePermissionService) {}

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.ListRolePermission)
  @Get()
  getList(): Promise<RolePermission[]> {
    return this.rolePermissionService.getList();
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.DetailRolePermission)
  @Get(':id')
  getDetailById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RolePermission | null> {
    return this.rolePermissionService.getDetailById(id);
  }
}
