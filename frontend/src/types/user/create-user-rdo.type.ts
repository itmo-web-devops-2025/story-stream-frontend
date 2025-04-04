import { User } from '@/types/user/user.interface'

export type CreateUserRdo = Omit<User, 'password'>
