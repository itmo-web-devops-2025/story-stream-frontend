import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren
} from 'react'
import { Link, LinkProps } from 'react-router'
import styles from './nav-menu.module.css'

type TProps = {
  linkProps?: LinkProps
  buttonProps?: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
  isButton?: boolean
}

const Item = ({
  children,
  isButton,
  linkProps,
  buttonProps
}: PropsWithChildren<TProps>) => (
  <li className={styles['item']}>
    {isButton ? (
      <button className={styles['link']} {...buttonProps}>
        {children}
      </button>
    ) : (
      linkProps && (
        <Link className={styles['link']} {...linkProps}>
          {children}
        </Link>
      )
    )}
  </li>
)

const NavMenu = ({ children }: PropsWithChildren) => (
  <nav>
    <ul className={styles['list']}>{children}</ul>
  </nav>
)

NavMenu.Item = Item
export default NavMenu
