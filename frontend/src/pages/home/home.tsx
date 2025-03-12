import HeaderDefault from '@/features/header-default/header-default'
import Profile from '@/features/profile/profile'
import Page from '@/shared/layouts/page/page'
import Modal from '@/shared/widgets/modal/modal'

const Home = () => (
  <Page>
    <HeaderDefault />
    <Profile />
    <Modal open={true} />
  </Page>
)

export default Home
