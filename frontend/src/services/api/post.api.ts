import { apiClient } from '@/services/api/main'
import { PaginationQuery } from '@/types/core/pagination-query.interface'
import { CreatePostDto } from '@/types/post/create-post-dto.type'
import { GetPostsDto } from '@/types/post/get-posts-dto.interface'
import { CreateUserRdo } from '@/types/user/create-user-rdo.type'
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
