import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }
}
