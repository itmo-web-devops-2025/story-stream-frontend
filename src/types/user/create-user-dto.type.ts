import { User } from '@/types/user/user.interface'

export type CreateUserDto = Pick<User, 'username' | 'password'>
