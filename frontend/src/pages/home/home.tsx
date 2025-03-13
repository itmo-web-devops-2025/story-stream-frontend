import Articles from '@/features/articles/articles'
import HeaderDefault from '@/features/header-default/header-default'
import Profile from '@/features/profile/profile'
import Page from '@/shared/layouts/page/page'
import Modal from '@/shared/widgets/modal/modal'

const Home = () => (
  <Page>
    <HeaderDefault />
    <Profile />
    <Articles>
      <Articles.Item />
      <Articles.Item />
      <Articles.Item />
      <Articles.Item />
    </Articles>
    <Modal />
  </Page>
)

export default Home
