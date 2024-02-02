import { IsOptional, IsString } from 'class-validator';

export class FilterProductsDto {
  @IsOptional()
  @IsString()
  search: string;
}
