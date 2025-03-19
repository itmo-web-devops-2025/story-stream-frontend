import { PathRoute } from '@/constants/core/path-route.constant'
import Articles from '@/features/articles/articles'
import HeaderDefault from '@/features/header-default/header-default'
import Profile from '@/features/profile/profile'
import Content from '@/shared/layouts/content/content'
import Footer from '@/shared/layouts/footer/footer'
import Page from '@/shared/layouts/page/page'
import Modal from '@/shared/widgets/modal/modal'

const Home = () => (
  <Page>
    <HeaderDefault />
    <Profile />
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
