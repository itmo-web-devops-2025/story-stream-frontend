import type { PropsWithChildren } from 'react'
import { Link, LinkProps } from 'react-router'
import styles from './nav-menu.module.css'

const Item = ({ children, ...props }: PropsWithChildren<LinkProps>) => (
  <li className={styles['item']}>
    <Link className={styles['link']} {...props}>
      {children}
    </Link>
  </li>
)

const NavMenu = ({ children }: PropsWithChildren) => (
  <nav>
    <ul className={styles['list']}>{children}</ul>
  </nav>
)

NavMenu.Item = Item
export default NavMenu
