import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from '@/modules/post/post.service';
import { CreatePostDto } from '@/modules/post/dto/createPost.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FastifyRequestWithUser } from '@/types/request';
import { UpdatePostDto } from '@/modules/post/dto/updatePost.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Req() request: FastifyRequestWithUser) {
    return this.postService.create(createPostDto, request.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Get()
  async getPostsByPage(@Query('page') page: number = 1) {
    return this.postService.getPostsByPage(+page);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/like')
  async likePost(@Param('id') id: string, @Req() request: FastifyRequestWithUser) {
    return this.postService.likePost(+id, +request.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() request: FastifyRequestWithUser) {
    return this.postService.delete(+id, request.user.id);
  }
}
