import { User } from '@/types/user/user.interface'

export type UpdateUserDto = Pick<User, 'bio'>
