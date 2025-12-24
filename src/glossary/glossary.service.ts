import { Injectable, NotFoundException } from '@nestjs/common';
import { Glossary } from './entity/glossary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GlossaryService {
  constructor(
    @InjectRepository(Glossary)
    private glossaryRepository: Repository<Glossary>,
  ) {}

  async getList(): Promise<Glossary[]> {
    return this.glossaryRepository
      .createQueryBuilder('g')
      .withDeleted()
      .getMany();
  }

  async getDetailById(id: number): Promise<Glossary> {
    const glossary = await this.glossaryRepository
      .createQueryBuilder('g')
      .withDeleted()
      .where({ id })
      .getOne();

    if (!glossary) {
      throw new NotFoundException('Glossary not found');
    }

    return glossary;
  }
}
