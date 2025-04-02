import { Post } from '@/types/post/post.interface'

export type CreatePostDto = Pick<Post, 'title' | 'body'>
