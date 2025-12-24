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
import { TouristService } from './tourist.service';
import { Tourist } from './entity/tourist.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { ResponseInterceptor } from 'src/response/response.interceptor';
import { CreateTouristDto, UpdateTouristDto } from './dto/tourist.dto';
import { PermissionGuard } from 'src/auth/permission.guard';
import { Permission as PermissionUtil } from 'src/shared/utils/permission';
import { Permission } from 'src/auth/permission.decorator';

@Controller('tourist')
@UseInterceptors(ResponseInterceptor)
export class TouristController {
  constructor(private readonly touristService: TouristService) {}

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.ListTourist)
  @Get()
  getList(): Promise<Tourist[]> {
    return this.touristService.getList();
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.DetailTourist)
  @Get(':id')
  getDetailById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Tourist | null> {
    return this.touristService.getDetailById(id);
  }

  @Get('phone/:phone')
  getDetailByPhone(@Param('phone') phone: string): Promise<Tourist> {
    return this.touristService.getDetailByPhone(phone);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.CreateTourist)
  @Post()
  create(@Body() createTouristDto: CreateTouristDto): Promise<Tourist> {
    return this.touristService.create(createTouristDto);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.UpdateTourist)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTouristDto: UpdateTouristDto,
  ): Promise<Tourist> {
    return this.touristService.update(id, updateTouristDto);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.DeleteTourist)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<Tourist> {
    return this.touristService.delete(id);
  }
}
