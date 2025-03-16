import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@/modules/post/entities/post.entity';
import { User } from '@/modules/user/entities/user.entity';
import { PostService } from '@/modules/post/post.service';
import { PostController } from '@/modules/post/post.controller';
import { PostLike } from '@/modules/postLike/entities/postLike.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, PostLike])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
