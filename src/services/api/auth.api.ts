import { apiClient } from '@/services/api/main'
import { AuthLoginDto } from '@/types/auth/auth-login-dto.type'
import { useMutation } from '@tanstack/react-query'

export const useAuthLoginMutation = () =>
  useMutation({
    mutationKey: ['login'],
    mutationFn: ({ body }: { body: AuthLoginDto }) =>
      apiClient.post<{ accessToken: string }>('/auth/login', body)
  })
