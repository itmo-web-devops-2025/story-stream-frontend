import HeaderDefault from '@/features/header-default/header-default'
import Registration from '@/features/registration/registration'
import Content from '@/shared/layouts/content/content'
import Footer from '@/shared/layouts/footer/footer'
import Page from '@/shared/layouts/page/page'
import type { FC } from 'react'

const SignUp: FC = () => (
  <Page>
    <HeaderDefault />
    <Page.Header title='Регистрация' />
    <Content>
      <Registration />
    </Content>
    <Footer />
  </Page>
)

export default SignUp
