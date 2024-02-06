import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from './entity/user.entity';
import { UpdateUserDto } from './dto /update-user.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  @ApiOperation({ summary: 'Get all users' })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get the profile of the current user' })
  async getProfile(@GetUser() user: User) {
    return await user;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user profile' })
  @ApiParam({ name: 'id', required: true })
  async updateProfile(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return await this.usersService.update(id, payload);
  }
}
