// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entity/user.entity';
import { AuthPayload } from './dto/auth.dto';
import { JwtPayload } from './jwt-payload.interface';
import { CreateUserDto } from 'src/users/dto /create-user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    return this.usersService.signUp(createUserDto);
  }

  async signIn(
    authCredentialsDto: AuthPayload,
  ): Promise<{ accessToken: string }> {
    const username =
      await this.usersService.validateUserPassword(authCredentialsDto);

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Retrieve the user from the database based on the username
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = { username, role: user.role };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
