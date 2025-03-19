import type { PropsWithChildren } from 'react'
import { Link, LinkProps } from 'react-router'

import styles from './app-link.module.css'

const AppLink = ({ children, ...props }: PropsWithChildren<LinkProps>) => (
    <Link className={styles['link']} {...props}>
      {children}
    </Link>
  )

export default AppLink
