import { Injectable } from '@nestjs/common';
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
    return this.glossaryRepository.find();
  }

  async getDetailById(id: number): Promise<Glossary | null> {
    return this.glossaryRepository.findOne({ where: { id } });
  }
}
