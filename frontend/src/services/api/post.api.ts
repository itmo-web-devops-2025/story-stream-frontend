import { apiClient } from '@/services/api/main'
import { CreatePostDto } from '@/types/post/create-post-dto.type'
import { Post } from '@/types/post/post.interface'
import { CreateUserRdo } from '@/types/user/create-user-rdo.type'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useCreatePostMutation = () =>
  useMutation({
    mutationKey: ['createArticle'],
    mutationFn: ({ body }: { body: CreatePostDto }) =>
      apiClient.post<CreateUserRdo>('/posts', body)
  })

export const useGetPosts = ({ query: { page } }: { query: { page: number } }) =>
  useQuery({
    queryKey: ['posts'],
    queryFn: () => apiClient.get<Post[]>(`/posts?page=${page}`)
  })
