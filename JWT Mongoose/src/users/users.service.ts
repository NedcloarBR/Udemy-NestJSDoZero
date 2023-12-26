import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { SignupDTO } from './DTO/signup.dto';
import { SigninDTO } from './DTO/signin.dto';
import { User } from './models/users.model';
import { compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly usersModel: Model<User>,
    @Inject() private readonly authService: AuthService,
  ) {}

  public async signup(signupDTO: SignupDTO): Promise<User> {
    const user = new this.usersModel(signupDTO);
    return user.save();
  }

  public async signin(
    signinDTO: SigninDTO,
  ): Promise<{ name: string; JwtToken: string; email: string }> {
    const user = await this.findByEmail(signinDTO.email);
    const match = await this.checkPassword(signinDTO.password, user);

    if (!match) {
      throw new NotFoundException('Invalid credentials');
    }

    const JwtToken = await this.authService.createAccessToken(user._id);
    return { name: user.name, JwtToken, email: user.email };
  }

  public async findALl(): Promise<Array<User>> {
    return this.usersModel.find();
  }

  private async findByEmail(email: string): Promise<User> {
    const user = await this.usersModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('Email not found');
    }
    return user;
  }

  private async checkPassword(password: string, user: User): Promise<boolean> {
    const match = await compare(password, user.password);

    if (!match) {
      throw new NotFoundException('Password not found');
    }
    return match;
  }
}
