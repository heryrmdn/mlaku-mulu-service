import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsInt({ each: true })
  permissionIds: number[];
}

export class UpdateRoleDto extends CreateRoleDto {}
