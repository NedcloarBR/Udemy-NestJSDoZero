import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsBoolean } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ description: "Email do usuário" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: "Nome completo do usuário" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "Define se o usuário é um administrador",
    default: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  admin: boolean;
}
