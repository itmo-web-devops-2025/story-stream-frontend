import { Id } from '@/types/core/id.type'
import { User } from '@/types/user/user.interface'

export interface Comment {
  id: Id
  text: string
  user: User
}
