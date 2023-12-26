import { Injectable } from "@nestjs/common";
import { NotFoundError } from "src/common/errors/NotFoundError";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { UsersRepository } from "./repositories/users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.repository.create(createUserDto);
  }

  async findAll(): Promise<Array<UserEntity>> {
    return await this.repository.findAll();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.repository.findOne(id);
    if (!user) throw new NotFoundError("Usuário não encontrado");
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.repository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<UserEntity> {
    return this.repository.remove(id);
  }
}
