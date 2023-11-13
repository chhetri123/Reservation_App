import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async createUser(@Body() CreateUserDto: CreateUserDto) {
    return this.usersService.create(CreateUserDto);
  }
}
