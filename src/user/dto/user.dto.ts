import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class BaseUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsInt()
  @IsNotEmpty()
  roleId: number;
}

export class CreateUserDto extends BaseUserDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto extends BaseUserDto {}

export class UpdateUserPasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
