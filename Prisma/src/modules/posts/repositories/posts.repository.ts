import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { NotFoundError } from "src/common/errors/NotFoundError";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { CreatePostDto } from "../dto/create-post.dto";
import { UpdatePostDto } from "../dto/update-post.dto";
import { PostEntity } from "../entities/post.entity";

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const { authorEmail: email } = createPostDto;

    delete createPostDto.authorEmail;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundError("Author not found");
    }

    const data: Prisma.PostCreateInput = {
      ...createPostDto,
      author: {
        connect: {
          email
        }
      }
    };
    return this.prisma.post.create({
      data,
    });
  }

  async findAll(): Promise<Array<PostEntity>> {
    return this.prisma.post.findMany({
      include: {
        author: true
      }
    });
  }

  async findOne(id: number): Promise<PostEntity> {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    const { authorEmail: email} = updatePostDto

    if(!email) {
      return this.prisma.post.update({
        where: { id },
        data: updatePostDto
      })
    }

    delete updatePostDto.authorEmail;

    const user = await this.prisma.user.findUnique({
      where: { email }
    })

    if(!user) {
      throw new NotFoundError("Author not found.")
    }

    const data: Prisma.PostUpdateInput = {
      ...updatePostDto,
      author: {
        connect: {
          email
        }
      }
    }

    return this.prisma.post.update({
      where: { id },
      data,
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
  }

  async remove(id: number): Promise<PostEntity> {
    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
