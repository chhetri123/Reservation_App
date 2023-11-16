import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  async validateUser(email: string, passport: string) {
    const user = await this.usersRepository.findOne({ email });

    const passportIsMatch = await bcrypt.compare(passport, user.password);
    if (!passportIsMatch) {
      throw new UnauthorizedException(`Credentials are not valid`);
    }
    return user;
  }
}
