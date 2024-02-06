import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterProductsDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description:
      'The search string to look for in the product name and description',
    type: String,
    required: false,
  })
  search: string;
}
