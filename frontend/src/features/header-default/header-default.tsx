import Logo from '@/shared/core/logo/logo'
import Header from '@/shared/layouts/header/header'
import NavMenu from '@/shared/widgets/nav-menu/nav-menu'
import type { FC } from 'react'

const HeaderDefault: FC = () => {
  console.log(`HeaderDefault component is working`)

  return (
    <Header>
      <Logo />
      <NavMenu>
        <NavMenu.Item to='/'>Главная</NavMenu.Item>
        <NavMenu.Item to='/sign-in'>Войти</NavMenu.Item>
        <NavMenu.Item to='/sign-up'>Регистрация</NavMenu.Item>
      </NavMenu>
      {/*<Burger />*/}
    </Header>
  )
}

export default HeaderDefault
