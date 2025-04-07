import { apiClient } from '@/services/api/main'
import { Id } from '@/types/core/id.type'
import { PaginationQuery } from '@/types/core/pagination-query.interface'
import { CreatePostDto } from '@/types/post/create-post-dto.type'
import { GetPostsDto } from '@/types/post/get-posts-dto.interface'
import { Post } from '@/types/post/post.interface'
import { CreateUserRdo } from '@/types/user/create-user-rdo.type'
import { isDefined } from '@/utils/is-defined.util'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useCreatePostMutation = () =>
  useMutation({
    mutationKey: ['createArticle'],
    mutationFn: ({ body }: { body: CreatePostDto }) =>
      apiClient.post<CreateUserRdo>('/posts', body)
  })

export const useGetPosts = ({
  query = { page: 1, size: 10 }
}: {
  query: PaginationQuery
}) =>
  useQuery({
    queryKey: ['posts', query.page, query.size],
    queryFn: () =>
      apiClient.get<GetPostsDto>(`/posts?page=${query.page}&size=${query.size}`)
  })

export const useGetPost = (postId: Id) =>
  useQuery({
    queryKey: ['posts', postId],
    enabled: isDefined(postId),
    queryFn: () => apiClient.get<Post>(`/posts/${postId}`)
  })
