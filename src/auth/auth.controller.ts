import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayload } from './dto/auth.dto';
import { CreateUserDto } from 'src/users/dto /create-user.entity';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiParam({ name: 'CreateUserDto', required: true })
  async signUp(@Body() authCredentialsDto: CreateUserDto): Promise<void> {
    return await this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  @ApiOperation({ summary: 'Sign in' })
  @ApiParam({ name: 'AuthPayload', required: true })
  @ApiResponse({ status: 201, description: 'Return the access token' })
  async signIn(
    @Body() authCredentialsDto: AuthPayload,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authCredentialsDto);
  }
}
