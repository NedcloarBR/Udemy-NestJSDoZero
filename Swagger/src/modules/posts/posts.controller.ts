import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { ApiForbiddenResponse, ApiTags } from "@nestjs/swagger";

@Controller("posts")
@ApiTags("Posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiForbiddenResponse({ description: "Acesso negado" })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @ApiForbiddenResponse({ description: "Acesso negado" })
  findAll() {
    return this.postsService.findAll();
  }

  @Get(":id")
  @ApiForbiddenResponse({ description: "Acesso negado" })
  findOne(@Param("id") id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(":id")
  @ApiForbiddenResponse({ description: "Acesso negado" })
  update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(":id")
  @ApiForbiddenResponse({ description: "Acesso negado" })
  remove(@Param("id") id: string) {
    return this.postsService.remove(+id);
  }
}
