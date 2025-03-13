import { IsString, IsOptional } from 'class-validator';

export class UpdateDoctorDto {
  @IsString()
  name?: string;

  @IsString()
  specialty?: string;
}