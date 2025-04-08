import HeaderDefault from '@/features/header-default/header-default'
import ProfileSetting from '@/features/profile-setting/profile-setting'
import Content from '@/shared/layouts/content/content'
import Footer from '@/shared/layouts/footer/footer'
import Page from '@/shared/layouts/page/page'
import type { FC } from 'react'

const Profile: FC = () => (
  <Page>
    <HeaderDefault />
    <Page.Header title='Настройки пользователя' />
    <Content>
      <ProfileSetting />
    </Content>
    <Footer />
  </Page>
)

export default Profile
