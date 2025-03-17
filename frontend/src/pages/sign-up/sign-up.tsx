import HeaderDefault from '@/features/header-default/header-default'
import Registration from '@/features/registration/registration'
import Page from '@/shared/layouts/page/page'
import type { FC } from 'react'

const SignUp: FC = () => (
  <Page>
    <HeaderDefault />
    <Registration />
  </Page>
)

export default SignUp
