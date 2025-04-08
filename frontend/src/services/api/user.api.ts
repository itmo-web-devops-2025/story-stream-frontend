import { apiClient } from '@/services/api/main'
import { CreateUserDto } from '@/types/user/create-user-dto.type'
import { CreateUserRdo } from '@/types/user/create-user-rdo.type'
import { useMutation } from '@tanstack/react-query'

export const useCreateUserMutation = () =>
  useMutation({
    mutationKey: ['createUser'],
    mutationFn: ({ body }: { body: CreateUserDto }) =>
      apiClient.post<CreateUserRdo>('/users', body)
  })
