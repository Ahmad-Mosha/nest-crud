import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class AuthPayload {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The username of the user',
    type: String,
    required: true,
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/, {
    message:
      'Password must be at least 8 characters long 1 lowercase letter, and 1 number',
  })
  @ApiProperty({
    description:
      'The password of the user , must be at least 8 characters long 1 lowercase letter, and 1 number',
    type: String,
    required: true,
  })
  password: string;
}
