import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Permission as PermissionEntity } from './entity/permission.entity';
import { PermissionService } from './permission.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ResponseInterceptor } from 'src/response/response.interceptor';
import { Permission } from 'src/auth/permission.decorator';
import { PermissionGuard } from 'src/auth/permission.guard';
import { Permission as PermissionUtil } from 'src/shared/utils/permission';

@Controller('permission')
@UseInterceptors(ResponseInterceptor)
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.ListPermission)
  @Get()
  getList(): Promise<PermissionEntity[]> {
    return this.permissionService.getList();
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.DetailPermission)
  @Get(':id')
  getDetailById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PermissionEntity> {
    return this.permissionService.getDetailById(id);
  }
}
