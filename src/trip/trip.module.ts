import { Module } from '@nestjs/common';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './entity/trip.entity';
import { TouristModule } from 'src/tourist/tourist.module';

@Module({
  imports: [TypeOrmModule.forFeature([Trip]), TouristModule],
  controllers: [TripController],
  providers: [TripService],
  exports: [TripService],
})
export class TripModule {}
