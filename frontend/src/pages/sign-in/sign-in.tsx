import Authorization from '@/features/authorization/authorization'
import HeaderDefault from '@/features/header-default/header-default'
import Content from '@/shared/layouts/content/content'
import Footer from '@/shared/layouts/footer/footer'
import Page from '@/shared/layouts/page/page'
import type { FC } from 'react'

const SignIn: FC = () => (
  <Page>
    <HeaderDefault />
    <Content>
      <Authorization />
    </Content>
    <Footer />
  </Page>
)

export default SignIn
