import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '@/modules/comment/entities/comment.entity';
import { CommentService } from '@/modules/comment/comment.service';
import { CommentController } from '@/modules/comment/comment.controller';
import { User } from '@/modules/user/entities/user.entity';
import { Post } from '@/modules/post/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post, User])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
