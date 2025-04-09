import { apiClient } from '@/services/api/main'
import { Id } from '@/types/core/id.type'
import { PaginationQuery } from '@/types/core/pagination-query.interface'
import { CreatePostDto } from '@/types/post/create-post-dto.type'
import { GetPostsDto } from '@/types/post/get-posts-dto.interface'
import { Post } from '@/types/post/post.interface'
import { isDefined } from '@/utils/is-defined.util'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['create', 'posts'],
    mutationFn: ({ body }: { body: CreatePostDto }) =>
      apiClient.post('/posts', body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })
}

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['update', 'posts'],
    mutationFn: ({ body, postId }: { body: CreatePostDto; postId: Id }) =>
      apiClient.patch(`/posts/${postId}`, body),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['posts', variables.postId] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })
}

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['delete', 'posts'],
    mutationFn: ({ postId }: { postId: Id }) =>
      apiClient.delete(`/posts/${postId}`),
    onSuccess: (_data, variables) => {
      // Инвалидируем кэш для этого поста и всех постов
      queryClient.invalidateQueries({ queryKey: ['posts', variables.postId] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })
}

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

export const useLikePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['likePost'],
    mutationFn: ({ postId }: { postId: Id }) =>
      apiClient.patch(`/posts/${postId}/like`),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['posts', variables.postId] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })
}
