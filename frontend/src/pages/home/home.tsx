import { PathRoute } from '@/constants/core/path-route.constant'
import Articles from '@/features/articles/articles'
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
      <Articles>
        <Articles.Item href={PathRoute.Articles} />
        <Articles.Item href={PathRoute.Articles} />
        <Articles.Item href={PathRoute.Articles} />
        <Articles.Item href={PathRoute.Articles} />
      </Articles>
    </Content>
    <Footer />
    <Modal />
  </Page>
)

export default Home
