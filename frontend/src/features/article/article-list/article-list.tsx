import { PathRoute } from '@/constants/core/path-route.constant'
import ArticleTools from '@/features/article/article-list/components/article-tools/article-tools'
import Articles from '@/features/article/article-list/components/articles/articles'
import type { FC } from 'react'

const ArticleList: FC = () => {
  console.log(`ArticleList component is working`)

  return (
    <Articles>
      <ArticleTools />
      <Articles.Item href={PathRoute.Articles} />
      <Articles.Item href={PathRoute.Articles} />
      <Articles.Item href={PathRoute.Articles} />
      <Articles.Item href={PathRoute.Articles} />
    </Articles>
  )
}

export default ArticleList
