import { User } from '@/types/user/user.interface'

export type AuthLoginDto = {
  user: Pick<User, 'username' | 'password'>
}
