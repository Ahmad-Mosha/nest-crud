import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The username of the user',
    type: String,
    required: false,
  })
  username: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The password of the user',
    type: String,
    required: false,
  })
  password: string;
}
