import { IsString, IsInt, IsOptional, Min, Max } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  @Max(120)
  age: number;

  @IsString()
  @IsOptional()
  diagnostic: string;
}
