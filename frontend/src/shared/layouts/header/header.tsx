import type { FC, PropsWithChildren } from 'react'
import styles from './header.module.css'

const Header: FC<PropsWithChildren> = ({ children }) => (
  <header className={styles['header']}>{children}</header>
)

export default Header
