import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.permissionRepository
      .createQueryBuilder('p')
      .withDeleted()
      .getMany();
  }

  async getDetailById(id: number): Promise<Permission> {
    const permission = await this.permissionRepository
      .createQueryBuilder('p')
      .withDeleted()
      .where({ id })
      .getOne();

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    return permission;
  }
}
