import { apiClient } from '@/services/api/main'
import { CreateUserDto } from '@/types/user/create-user-dto.type'
import { useMutation } from '@tanstack/react-query'

export const useCreateUserMutation = () =>
  useMutation({
    mutationKey: ['createUser'],
    mutationFn: (createUserDto: CreateUserDto) =>
      apiClient.post('/user', createUserDto)
  })
