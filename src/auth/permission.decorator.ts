import { SetMetadata } from '@nestjs/common';
import { Permission as PermissionUtil } from 'src/shared/utils/permission';

export const PERMISSION_KEY = 'permission';
export const Permission = (...permission: PermissionUtil[]) =>
  SetMetadata(PERMISSION_KEY, permission);
