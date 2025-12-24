import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './entity/role.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { ResponseInterceptor } from 'src/response/response.interceptor';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { Permission as PermissionUtil } from 'src/shared/utils/permission';
import { Permission } from 'src/auth/permission.decorator';
import { PermissionGuard } from 'src/auth/permission.guard';

@Controller('role')
@UseInterceptors(ResponseInterceptor)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.ListRole)
  @Get()
  getList(): Promise<Role[]> {
    return this.roleService.getList();
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.DetailRole)
  @Get(':id')
  getDetailById(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    return this.roleService.getDetailById(id);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.CreateRole)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.create(createRoleDto);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.UpdateRole)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    return this.roleService.update(id, updateRoleDto);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.DeleteRole)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    return this.roleService.delete(id);
  }
}
