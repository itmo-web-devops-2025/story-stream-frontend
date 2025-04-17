import { Comment } from '@/types/comment/comment.interface'
import { Id } from '@/types/core/id.type'
import { User } from '@/types/user/user.interface'

export interface Post {
  id: Id
  title: string
  body: string
  likes: { id: Id; user: User }[]
  favoritesCount: 0
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  user: User
  comments: Comment[]
}
