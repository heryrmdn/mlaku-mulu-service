import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermission } from './entity/role_permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermission>,
  ) {}

  async getList(): Promise<RolePermission[]> {
    return this.rolePermissionRepository
      .createQueryBuilder('rp')
      .withDeleted()
      .leftJoinAndSelect('rp.role', 'role')
      .leftJoinAndSelect('rp.permission', 'permission')
      .getMany();
  }

  async getDetailById(id: number): Promise<RolePermission | null> {
    const rolePermission = await this.rolePermissionRepository
      .createQueryBuilder('rp')
      .withDeleted()
      .leftJoinAndSelect('rp.role', 'role')
      .leftJoinAndSelect('rp.permission', 'permission')
      .where({ id })
      .getOne();
    if (!rolePermission) {
      throw new NotFoundException('Role Permission not found');
    }
    return rolePermission;
  }
}
