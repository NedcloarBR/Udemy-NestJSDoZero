import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SigninDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  password: string;
}
