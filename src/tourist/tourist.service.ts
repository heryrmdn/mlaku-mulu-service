import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tourist } from './entity/tourist.entity';
import { Brackets, Repository } from 'typeorm';
import { CreateTouristDto, UpdateTouristDto } from './dto/tourist.dto';
import { Glossary as GlossaryUtil } from 'src/shared/utils/glossary';

@Injectable()
export class TouristService {
  constructor(
    @InjectRepository(Tourist)
    private touristRepository: Repository<Tourist>,
  ) {}

  async getList(): Promise<Tourist[]> {
    return this.touristRepository
      .createQueryBuilder('t')
      .withDeleted()
      .leftJoinAndSelect('t.status', 'status')
      .leftJoinAndSelect('t.trips', 'trips')
      .getMany();
  }

  async getDetailById(id: number): Promise<Tourist> {
    const tourist = await this.touristRepository
      .createQueryBuilder('t')
      .withDeleted()
      .leftJoinAndSelect('t.status', 'status')
      .leftJoinAndSelect('t.trips', 'trips')
      .where({ id })
      .getOne();
    if (!tourist) {
      throw new NotFoundException('Tourist not found');
    }
    return tourist;
  }

  async getDetailByPhone(phone: string): Promise<Tourist> {
    const tourist = await this.touristRepository
      .createQueryBuilder('t')
      .withDeleted()
      .leftJoinAndSelect('t.status', 'status')
      .leftJoinAndSelect('t.trips', 'trips')
      .where({ phone })
      .getOne();
    if (!tourist) {
      throw new NotFoundException('Tourist not found');
    }
    return tourist;
  }

  async getExistTouristByPhone(phone: string): Promise<Tourist | null> {
    const tourist = await this.touristRepository
      .createQueryBuilder('t')
      .withDeleted()
      .leftJoinAndSelect('t.status', 'status')
      .leftJoinAndSelect('t.trips', 'trips')
      .where({ phone })
      .getOne();
    return tourist;
  }

  async create(createTouristDto: CreateTouristDto): Promise<Tourist> {
    const existTouristByPhone = await this.getExistTouristByPhone(
      createTouristDto.phone,
    );

    if (
      existTouristByPhone &&
      existTouristByPhone.statusId === GlossaryUtil.TouristsStatusActive
    ) {
      throw new ConflictException('Tourist phone already exist');
    }

    const tourist = await this.touristRepository.save(
      this.touristRepository.create({
        ...createTouristDto,
        statusId: GlossaryUtil.TouristsStatusActive,
      }),
    );

    return this.getDetailById(tourist.id);
  }

  async update(
    id: number,
    updateTouristDto: UpdateTouristDto,
  ): Promise<Tourist> {
    await this.getDetailById(id);

    const existTouristByPhone = await this.getExistTouristByPhone(
      updateTouristDto.phone,
    );

    if (
      existTouristByPhone &&
      existTouristByPhone.id !== id &&
      existTouristByPhone.statusId === GlossaryUtil.TouristsStatusActive
    ) {
      throw new ConflictException('Tourist phone already exist');
    }

    await this.touristRepository.update(id, updateTouristDto);

    return this.getDetailById(id);
  }

  async delete(id: number): Promise<Tourist> {
    const tourist = await this.getDetailById(id);
    if (tourist?.statusId === GlossaryUtil.TouristsStatusDeleted) {
      throw new ConflictException('Tourist status already deleted');
    }

    await this.touristRepository.update(id, {
      statusId: GlossaryUtil.TouristsStatusDeleted,
      deletedAt: new Date(),
    });

    return this.getDetailById(id);
  }
}
