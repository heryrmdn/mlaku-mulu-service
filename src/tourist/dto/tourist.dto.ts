import { Type } from 'class-transformer';
import { IsDate, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTouristDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  idCardNumber: string;

  @IsString()
  @IsOptional()
  passportNumber: string;

  @IsDateString()
  @IsOptional()
  birthday: string;
}

export class UpdateTouristDto extends CreateTouristDto {}
