import { User } from '@/types/user/user.interface'

export type UserInfo = Omit<User, 'password'>
