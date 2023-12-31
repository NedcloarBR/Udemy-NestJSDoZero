import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  password: string;
}
