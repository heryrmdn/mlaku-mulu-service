import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from './entity/trip.entity';
import { Repository } from 'typeorm';
import { CreateTripDto, UpdateTripDto } from './dto/trip.dto';
import { TouristService } from 'src/tourist/tourist.service';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,

    private touristService: TouristService,
  ) {}

  async getList(): Promise<Trip[]> {
    return this.tripRepository.find({ relations: { tourist: true } });
  }

  async getDetailById(id: number): Promise<Trip> {
    const trip = await this.tripRepository.findOne({
      where: { id },
      relations: { tourist: true },
    });
    if (!trip) {
      throw new NotFoundException('Trip not found');
    }
    return trip;
  }

  async create(createTripDto: CreateTripDto): Promise<Trip> {
    await this.touristService.getDetailById(createTripDto.tourist_id);

    const trip = await this.tripRepository.save(
      this.tripRepository.create(createTripDto),
    );

    return this.getDetailById(trip.id);
  }

  async update(id: number, updateTripDto: UpdateTripDto): Promise<Trip> {
    const trip = await this.getDetailById(id);

    await this.touristService.getDetailById(trip.tourist_id);

    await this.tripRepository.update(id, updateTripDto);

    return this.getDetailById(id);
  }

  async delete(id: number): Promise<void> {
    await this.getDetailById(id);

    await this.tripRepository.delete(id);
  }
}
