import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entity/user.entity';
import { AuthPayload } from './dto/auth.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signUp(authCredentialsDto: AuthPayload): Promise<void> {
    return this.usersService.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthPayload,
  ): Promise<{ accessToken: string }> {
    const username =
      await this.usersService.validateUserPassword(authCredentialsDto);

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
