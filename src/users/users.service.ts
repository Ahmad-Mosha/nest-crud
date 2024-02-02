import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';
import { AuthPayload } from 'src/auth/dto/auth.dto';
import { UpdateUserDto } from './dto /update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signUp(payload: AuthPayload): Promise<void> {
    const { username, password } = payload;

    const user = new User();
    user.username = username;
    user.password = await bcrypt.hash(password, 10);

    await this.usersRepository.save(user);
  }

  async validateUserPassword(authCredentialsDto: AuthPayload): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user.username;
    } else {
      return null;
    }
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async update(id: string, payload: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, payload);

    return await this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
