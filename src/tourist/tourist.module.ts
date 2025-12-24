import { Module } from '@nestjs/common';
import { TouristController } from './tourist.controller';
import { TouristService } from './tourist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tourist } from './entity/tourist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tourist])],
  controllers: [TouristController],
  providers: [TouristService],
  exports: [TouristService],
})
export class TouristModule {}
