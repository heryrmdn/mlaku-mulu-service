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
    return this.rolePermissionRepository.find({
      relations: { role: true, permission: true },
    });
  }

  async getDetailById(id: number): Promise<RolePermission | null> {
    const rolePermission = await this.rolePermissionRepository.findOne({
      where: { id },
      relations: { role: true, permission: true },
    });
    if (!rolePermission) {
      throw new NotFoundException('Role Permission not found');
    }
    return rolePermission;
  }
}
