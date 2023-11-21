import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {

    await this.validateCreateUserDto(createUserDto)
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
  async getUser(getUserDto: GetUserDto) { 
    return this.usersRepository.findOne({
      _id:getUserDto._id
    });
  }

  async validateCreateUserDto(createUserDto) {
    try {
      await this.usersRepository.findOne({email:createUserDto.email})
    } catch (err) {
      return
    }
    throw new UnprocessableEntityException("Email Already Exist")
    
  }
}
