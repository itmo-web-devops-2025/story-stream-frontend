import cn from 'classnames'
import type { PropsWithChildren, ReactElement } from 'react'
import { Link, LinkProps } from 'react-router'
import styles from './page.module.css'

type HeaderProps = {
  title?: ReactElement | string
  description?: string | null
  linkProps?: LinkProps
}

const Header = ({ title, description, linkProps }: HeaderProps) => (
  <section className={styles.pageHeader}>
    {linkProps ? (
      <Link className={cn(linkProps.className, styles.link)} {...linkProps}>
        {linkProps.children}
      </Link>
    ) : (
      <h2 className={styles.title}>{title}</h2>
    )}
    {description && <span className={styles.description}>{description}</span>}
  </section>
)

const Page = ({ children }: PropsWithChildren) => (
  <main className={styles['main']}>{children}</main>
)

Page.Header = Header
export default Page
