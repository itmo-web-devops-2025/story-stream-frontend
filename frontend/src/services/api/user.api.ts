import { apiClient } from '@/services/api/main'
import { Id } from '@/types/core/id.type'
import { CreateUserDto } from '@/types/user/create-user-dto.type'
import { CreateUserRdo } from '@/types/user/create-user-rdo.type'
import { UpdateUserDto } from '@/types/user/update-user-dto.type'
import { UserInfo } from '@/types/user/user-info.interface'
import { isDefined } from '@/utils/is-defined.util'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useCreateUserMutation = () =>
  useMutation({
    mutationKey: ['createUser'],
    mutationFn: ({ body }: { body: CreateUserDto }) =>
      apiClient.post<CreateUserRdo>('/users', body)
  })

export const useUpdateUserMutation = () =>
  useMutation({
    mutationKey: ['updateUser'],
    mutationFn: ({ userId, body }: { userId: string; body: UpdateUserDto }) =>
      apiClient.patch<CreateUserRdo>(`/users/${userId}`, body)
  })

export const useGetUser = (userId: Id) =>
  useQuery({
    queryKey: ['users'],
    enabled: isDefined(userId),
    queryFn: () => apiClient.get<UserInfo>(`/users/${userId}`)
  })
