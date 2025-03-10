import articlesMock from '@/mock/article/article.mock'
import { Article } from '@/types/article.interface'

export const getArticles = async (): Promise<Article[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(articlesMock), 500)
  })
