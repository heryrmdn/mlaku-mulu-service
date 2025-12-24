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
import { TripService } from './trip.service';
import { Trip } from './entity/trip.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { ResponseInterceptor } from 'src/response/response.interceptor';
import { CreateTripDto, UpdateTripDto } from './dto/trip.dto';
import { PermissionGuard } from 'src/auth/permission.guard';
import { Permission } from 'src/auth/permission.decorator';
import { Permission as PermissionUtil } from 'src/shared/utils/permission';

@Controller('trip')
@UseInterceptors(ResponseInterceptor)
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.ListTrip)
  @Get()
  getList(): Promise<Trip[]> {
    return this.tripService.getList();
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.DetailTrip)
  @Get(':id')
  getDetailById(@Param('id', ParseIntPipe) id: number): Promise<Trip> {
    return this.tripService.getDetailById(id);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.CreateTrip)
  @Post()
  create(@Body() createTripDto: CreateTripDto): Promise<Trip> {
    return this.tripService.create(createTripDto);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.UpdateTrip)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTripDto: UpdateTripDto,
  ): Promise<Trip> {
    return this.tripService.update(id, updateTripDto);
  }

  @UseGuards(AuthGuard, PermissionGuard)
  @Permission(PermissionUtil.DeleteTrip)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tripService.delete(id);
  }
}
