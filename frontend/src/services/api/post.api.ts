import { apiClient } from '@/services/api/main'
import { CreatePostDto } from '@/types/post/create-post-dto.type'
import { CreateUserRdo } from '@/types/user/create-user-rdo.type'
import { useMutation } from '@tanstack/react-query'

export const useCreatePostMutation = () =>
  useMutation({
    mutationKey: ['createPost'],
    mutationFn: ({ body }: { body: CreatePostDto }) =>
      apiClient.post<CreateUserRdo>('/posts', body)
  })
