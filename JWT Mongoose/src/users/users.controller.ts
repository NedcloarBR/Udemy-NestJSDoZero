import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SignupDTO } from './DTO/signup.dto';
import { SigninDTO } from './DTO/signin.dto';
import { User } from './models/users.model';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  public async signup(@Body() signupDTO: SignupDTO): Promise<User> {
    return this.usersService.signup(signupDTO);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  public async signin(
    @Body() signinDTO: SigninDTO,
  ): Promise<{ name: string; JwtToken: string; email: string }> {
    return this.usersService.signin(signinDTO);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<Array<User>> {
    return this.usersService.findALl();
  }
}
