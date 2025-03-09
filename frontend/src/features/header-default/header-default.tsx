import Burger from '@/shared/controllers/burger/burger'
import Logo from '@/shared/core/logo/logo'
import Header from '@/shared/layouts/header/header'
import type { FC } from 'react'

const HeaderDefault: FC = () => {
  console.log(`HeaderDefault component is working`)

  return (
    <Header>
      <Logo />
      <Burger />
    </Header>
  )
}

export default HeaderDefault
