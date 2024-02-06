import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The name of the product',
    type: String,
    required: false,
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The description of the product',
    type: String,
    required: false,
  })
  description: string;

  @IsOptional()
  @ApiProperty({
    description: 'The price of the product',
    type: Number,
    required: false,
  })
  price: number;
}
