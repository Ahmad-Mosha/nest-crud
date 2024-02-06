import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The name of the product',
    type: String,
    required: true,
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The description of the product',
    type: String,
    required: true,
  })
  description: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The price of the product',
    type: Number,
    required: true,
  })
  price: number;
}
