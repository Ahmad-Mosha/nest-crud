import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayload } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() authCredentialsDto: AuthPayload): Promise<void> {
    return await this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  async signIn(
    @Body() authCredentialsDto: AuthPayload,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authCredentialsDto);
  }
}
