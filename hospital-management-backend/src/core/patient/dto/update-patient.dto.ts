import { IsString, IsInt, IsOptional, Min, Max } from 'class-validator';

export class UpdatePatientDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(120)
  age?: number;

  @IsOptional()
  @IsString()
  diagnostic?: string;
}
