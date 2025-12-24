import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entity/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { Glossary as GlossaryUtil } from 'src/shared/utils/glossary';
import { RolePermission } from 'src/role_permission/entity/role_permission.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async getList(): Promise<Role[]> {
    return this.roleRepository.find({
      relations: { status: true, rolePermissions: true },
    });
  }

  async getDetailById(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: { status: true, rolePermissions: true },
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async getDetailByLowerName(name: string): Promise<Role | null> {
    const role = await this.roleRepository
      .createQueryBuilder('r')
      .where("LOWER(REPLACE(r.name, ' ', '')) = :name", {
        name: name.replace(/\s/g, '').toLowerCase(),
      })
      .getOne();

    return role;
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const existRole = await this.getDetailByLowerName(createRoleDto.name);
    if (existRole && existRole?.statusId === GlossaryUtil.RolesStatusActive) {
      throw new ConflictException('Role name already exist');
    }

    const role = await this.roleRepository.manager.transaction(
      async (manager) => {
        // Insert Role
        const role = await manager.save(Role, {
          name: createRoleDto.name,
          statusId: GlossaryUtil.RolesStatusActive,
        });

        // Insert Role Permissions
        if (createRoleDto.permissionIds?.length > 0) {
          const rolePermissions: Partial<RolePermission>[] = [];

          createRoleDto.permissionIds?.forEach((permissionId) => {
            rolePermissions.push({
              roleId: role.id,
              permissionId,
            });
          });

          await manager.insert(RolePermission, rolePermissions);
        }

        return role;
      },
    );

    return await this.getDetailById(role.id);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    await this.getDetailById(id);

    const existRole = await this.getDetailByLowerName(updateRoleDto.name);
    if (
      existRole &&
      existRole?.id !== id &&
      existRole?.statusId === GlossaryUtil.RolesStatusActive
    ) {
      throw new ConflictException('Role name already exist');
    }

    await this.roleRepository.manager.transaction(async (manager) => {
      // Update Role
      await manager.update(Role, id, { name: updateRoleDto.name });

      // Delete Role Permissions
      await manager.delete(RolePermission, { roleId: id });

      // Insert Role Permissions
      if (updateRoleDto.permissionIds?.length > 0) {
        const rolePermissions: Partial<RolePermission>[] = [];

        updateRoleDto.permissionIds?.forEach((permissionId) => {
          rolePermissions.push({
            roleId: id,
            permissionId,
          });
        });

        await manager.insert(RolePermission, rolePermissions);
      }
    });

    return await this.getDetailById(id);
  }

  async delete(id: number): Promise<Role> {
    const role = await this.getDetailById(id);
    if (role?.statusId === GlossaryUtil.RolesStatusDeleted) {
      throw new ConflictException('Role status already deleted');
    }

    await this.roleRepository.manager.transaction(async (manager) => {
      // Update Role
      await manager.update(Role, id, {
        statusId: GlossaryUtil.RolesStatusDeleted,
        deletedAt: new Date(),
      });

      // Delete Role Permissions
      await manager.delete(RolePermission, { roleId: id });
    });

    return await this.getDetailById(id);
  }
}
