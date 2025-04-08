import articlesMock from '@/mock/article/article.mock'
import { Post } from '@/types/post/post.interface'

export const getArticles = async (): Promise<Post[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(articlesMock), 500)
  })
