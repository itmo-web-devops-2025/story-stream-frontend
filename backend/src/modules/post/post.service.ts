import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from '@/modules/post/dto/createPost.dto';
import { UpdatePostDto } from '@/modules/post/dto/updatePost.dto';
import { Post } from '@/modules/post/entities/post.entity';
import { User } from '@/modules/user/entities/user.entity';
import { postLimit } from '@/modules/post/post.const';
import { PostLike } from '@/modules/postLike/entities/postLike.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PostLike)
    private readonly postLikeRepository: Repository<PostLike>,
  ) {}

  async create(createPostDto: CreatePostDto, userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new HttpException(`No user with this id = ${userId} was found`, HttpStatus.BAD_REQUEST);
    }

    const newPost = this.postRepository.create({
      ...createPostDto,
      user: user,
      likes: [],
      comments: [],
    });

    return this.postRepository.save(newPost);
  }

  async likePost(postId: number, userId: number) {
    const post = await this.postRepository.findOneBy({ id: postId });

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const like = await this.postLikeRepository.findOne({ where: { user } });

    if (like) {
      await this.postLikeRepository.remove(like);
    } else {
      await this.postLikeRepository.save({ post, user });
    }

    return this.postRepository.save(post);
  }

  async findOne(id: number) {
    return this.postRepository.findOne({
      where: { id },
      relations: { user: true, comments: true, likes: true },
    });
  }

  async getPostsByPage(page: number) {
    return this.postRepository.find({
      order: { createdAt: 'DESC' },
      take: postLimit,
      skip: (page - 1) * postLimit,
      relations: { user: true, comments: true, likes: true },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const existingPost = await this.postRepository.findOneBy({ id });

    if (!existingPost) {
      throw new HttpException(`No post with this id = ${id} was found`, HttpStatus.BAD_REQUEST);
    }

    await this.postRepository.update(id, { ...updatePostDto });
  }

  async delete(id: number, userId: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    if (post.user.id !== userId) {
      return false;
    }

    await this.postRepository.delete(id);
    return true;
  }
}
