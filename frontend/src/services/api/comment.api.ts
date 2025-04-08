import { apiClient } from '@/services/api/main'
import { CreateCommentDto } from '@/types/comment/create-comment-dto.type'
import { Id } from '@/types/core/id.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['createComment'],
    mutationFn: ({ postId, body }: { postId: Id; body: CreateCommentDto }) =>
      apiClient.post(`/comments/${postId}`, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['posts', variables.postId]
      })
    }
  })
}
