import { Comment } from '@/types/comment/comment.interface'
import { User } from '@/types/user/user.interface'

export interface Post {
  id: number
  title: string
  body: string
  likes: string[]
  favoritesCount: 0
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  user: User
  comments: Comment[]
}
