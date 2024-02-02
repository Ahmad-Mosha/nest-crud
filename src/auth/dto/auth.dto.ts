import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class AuthPayload {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/, {
    message:
      'Password must be at least 8 characters long 1 lowercase letter, and 1 number',
  })
  password: string;
}
