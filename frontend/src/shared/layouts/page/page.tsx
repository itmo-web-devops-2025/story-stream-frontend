import type { PropsWithChildren } from 'react'
import styles from './page.module.css'

type HeaderProps = {
  title?: string
  description?: string | null
}

const Header = ({ title, description }: HeaderProps) => (
  <section className={styles.pageHeader}>
    <h2 className={styles.title}>{title}</h2>
    {description && <span className={styles.description}>{description}</span>}
  </section>
)

const Page = ({ children }: PropsWithChildren) => (
  <main className={styles['main']}>{children}</main>
)

Page.Header = Header
export default Page
