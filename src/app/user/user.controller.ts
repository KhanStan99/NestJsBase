import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { Users } from 'src/database/entities';
import { LoginUserDto } from './dto/LoginUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('/signup')
  async createUser(@Body() CreateUserInput: CreateUserDto): Promise<Users> {
    return await this.service.createUser(CreateUserInput);
  }

  @Post('/login')
  async loginUser(@Body() loginInput: LoginUserDto): Promise<Users> {
    return await this.service.loginUser(loginInput);
  }
}
