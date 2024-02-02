import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from './entity/user.entity';
import { UpdateUserDto } from './dto /update-user.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@GetUser() user: User) {
    return await user;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return await this.usersService.update(id, payload);
  }
}
