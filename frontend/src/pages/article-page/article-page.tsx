import HeaderDefault from '@/features/header-default/header-default'
import Content from '@/shared/layouts/content/content'
import Footer from '@/shared/layouts/footer/footer'
import Page from '@/shared/layouts/page/page'
import type { FC } from 'react'

const ArticlePage: FC = () => {
  console.log(`Post component is working`)

  return (
    <Page>
      <HeaderDefault />
      <Content></Content>
      <Footer />
    </Page>
  )
}

export default ArticlePage
