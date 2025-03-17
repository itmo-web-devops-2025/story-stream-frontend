import { User } from '@/types/user.interface'
import { CreateUserDto } from '@/types/user/create-user-dto.type'

export type UpdateUserDto = Pick<User, 'bio'> & CreateUserDto
