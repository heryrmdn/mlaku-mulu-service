import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entity/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async getList(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  async getDetailById(id: number): Promise<Permission | null> {
    return this.permissionRepository.findOne({ where: { id } });
  }
}
