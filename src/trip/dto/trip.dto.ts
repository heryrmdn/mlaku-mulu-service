import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class BaseTripDto {
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  destination: string;
}

export class CreateTripDto extends BaseTripDto {
  @IsInt()
  @IsNotEmpty()
  tourist_id: number;
}

export class UpdateTripDto extends BaseTripDto {}
