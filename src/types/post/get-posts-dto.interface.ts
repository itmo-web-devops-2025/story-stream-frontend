import { PaginationMeta } from '@/types/core/pagination-meta.interface'
import { Post } from '@/types/post/post.interface'

export interface GetPostsDto {
  posts: Post[]
  meta: PaginationMeta
}
