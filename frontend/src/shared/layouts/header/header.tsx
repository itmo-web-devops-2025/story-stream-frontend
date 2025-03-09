import type { FC, PropsWithChildren } from 'react'

const Header: FC<PropsWithChildren> = ({ children }) => (
  <header>{children}</header>
)

export default Header
