import ArticleList from '@/features/article/article-list/article-list'
import HeaderDefault from '@/features/header-default/header-default'
import Content from '@/shared/layouts/content/content'
import Footer from '@/shared/layouts/footer/footer'
import Page from '@/shared/layouts/page/page'
import Modal from '@/shared/widgets/modal/modal'

const Home = () => (
  <Page>
    <HeaderDefault />
    <Page.Header title='Denis Invamov' description='Android Developer' />
    <Content>
      <ArticleList />
    </Content>
    <Footer />
    <Modal />
  </Page>
)

export default Home
