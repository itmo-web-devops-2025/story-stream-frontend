import { CreateUserDto } from '@/types/user/create-user-dto.type'
import { User } from '@/types/user/user.interface'

export type UpdateUserDto = Pick<User, 'bio'> & CreateUserDto
