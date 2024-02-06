import { IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';
import { UserRole } from '../entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty({ message: "Username can't be empty" })
  @IsString({ message: 'Username must be a string' })
  @ApiProperty({
    description: 'The username of the user',
    type: String,
    required: true,
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/, {
    message:
      'Password must be at least 8 characters long 1 lowercase letter, and 1 number',
  })
  @ApiProperty({
    description: 'The password of the user',
    type: String,
    required: true,
  })
  password: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  @ApiProperty({
    description: 'The role of the user',
    type: String,
    required: true,
  })
  role: UserRole;
}
