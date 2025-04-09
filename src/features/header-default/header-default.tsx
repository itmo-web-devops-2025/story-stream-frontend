import { useAuth } from '@/contexts/auth.context'
import { AuthStatus } from '@/enum/core/auth-status.enum'
import Logo from '@/shared/core/logo/logo'
import Header from '@/shared/layouts/header/header'
import NavMenu from '@/shared/widgets/nav-menu/nav-menu'
import type { FC } from 'react'

const HeaderDefault: FC = () => {
  const { authStatus, logout } = useAuth()

  return (
    <Header>
      <Logo />
      <NavMenu>
        <NavMenu.Item linkProps={{ to: '/' }}>Главная</NavMenu.Item>
        {authStatus === AuthStatus.UNAUTHENTICATED && (
          <>
            <NavMenu.Item linkProps={{ to: '/sign-in' }}>Войти</NavMenu.Item>

            <NavMenu.Item linkProps={{ to: '/sign-up' }}>
              Регистрация
            </NavMenu.Item>
          </>
        )}
        {authStatus === AuthStatus.AUTHENTICATED && (
          <>
            <NavMenu.Item
              isButton={true}
              buttonProps={{ onClick: () => logout() }}
            >
              Выйти
            </NavMenu.Item>
          </>
        )}
      </NavMenu>
    </Header>
  )
}

export default HeaderDefault
