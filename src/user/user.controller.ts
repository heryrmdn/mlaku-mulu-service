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
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { ResponseInterceptor } from 'src/response/response.interceptor';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { PermissionGuard } from 'src/auth/permission.guard';
import { Permission } from 'src/auth/permission.decorator';
import { Permission as PermissionUtil } from 'src/shared/utils/permission';

@Controller('user')
@UseInterceptors(ResponseInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.ListUser)
  @Get()
  getList(): Promise<User[]> {
    return this.userService.getList();
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.DetailUser)
  @Get(':id')
  getDetailById(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.userService.getDetailById(id);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.CreateUser)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.UpdateUser)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.DeleteUser)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.delete(id);
  }
}
