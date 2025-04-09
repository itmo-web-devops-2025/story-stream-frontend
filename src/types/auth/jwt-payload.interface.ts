import { User } from '@/types/user/user.interface'

export type JwtPayload = Pick<User, 'id' | 'username'>
