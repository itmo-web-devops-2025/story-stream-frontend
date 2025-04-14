import { AuthStatus } from '@/enum/core/auth-status.enum'
import { User } from '@/types/user/user.interface'

export type AuthContextType = {
  token: string | null
  authStatus: AuthStatus
  login: (token: string) => void
  logout: () => void
  user: User | null
}
