import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: "Username can't be empty" })
  @IsString({ message: 'Username must be a string' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/, {
    message:
      'Password must be at least 8 characters long 1 lowercase letter, and 1 number',
  })
  password: string;
}
