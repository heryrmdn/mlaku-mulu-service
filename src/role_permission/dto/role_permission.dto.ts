import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRolePermissionDto {
  @IsNumber()
  @IsNotEmpty()
  roleId: number;

  @IsNumber()
  @IsNotEmpty()
  permissionId: number;
}

export class UpdateRolePermissionDto extends CreateRolePermissionDto {}
