import Article from '@/features/article/article'
import HeaderDefault from '@/features/header-default/header-default'
import articlesMock from '@/mock/article/article.mock'
import Content from '@/shared/layouts/content/content'
import Footer from '@/shared/layouts/footer/footer'
import Page from '@/shared/layouts/page/page'
import type { FC } from 'react'

const ArticlePage: FC = () => {
  const [article] = articlesMock

  return (
    <Page>
      <HeaderDefault />
      <Page.Header title={article.title} />
      <Content>
        <Article article={article} />
      </Content>
      <Footer />
    </Page>
  )
}

export default ArticlePage
