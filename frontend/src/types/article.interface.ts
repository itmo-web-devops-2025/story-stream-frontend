import { User } from '@/types/user.interface'

export interface Article {
  slug: string
  title: string
  description: string
  body: string
  createdAt: Date
  updatedAt: Date
  favorited: false
  favoritesCount: 0
  author: User
}
