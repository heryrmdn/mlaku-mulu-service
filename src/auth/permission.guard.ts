import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from './permission.decorator';
import { Permission as PermissionUtil } from 'src/shared/utils/permission';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermission = this.reflector.getAllAndOverride<
      PermissionUtil[]
    >(PERMISSION_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredPermission) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    const rolePermissions = [...user.role.rolePermissions.map((rp) => rp.permissionId)];

    return requiredPermission.some((permission) =>
      rolePermissions.includes(permission),
    );
  }
}
