import ArticleContent from '@/features/article/article-content/article-content'
import HeaderDefault from '@/features/header-default/header-default'
import { useGetPost } from '@/services/api/post.api'
import Content from '@/shared/layouts/content/content'
import Footer from '@/shared/layouts/footer/footer'
import Page from '@/shared/layouts/page/page'
import type { FC } from 'react'
import { useParams } from 'react-router'

const ArticlePage: FC = () => {
  const { articleId } = useParams()
  const { data: postResponse } = useGetPost(articleId)
  const post = postResponse?.data

  console.log('post', post)

  return (
    <Page>
      <HeaderDefault />
      <Page.Header title={post?.title} />
      <Content>
        <ArticleContent article={post} />
      </Content>
      <Footer />
    </Page>
  )
}

export default ArticlePage
