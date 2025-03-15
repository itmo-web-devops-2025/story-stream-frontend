import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CommentService } from '@/modules/comment/comment.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FastifyRequestWithUser } from '@/types/request';
import { CreateCommentDto } from '@/modules/comment/dto/createComment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  async create(
    @Param('postId') postId: number,
    @Body() createCommentDto: CreateCommentDto,
    @Req() request: FastifyRequestWithUser,
  ) {
    return this.commentService.create(createCommentDto.text, request.user.id, +postId);
  }
}
