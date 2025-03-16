import type { PropsWithChildren } from 'react'
import styles from './page.module.css'

const Page = ({ children }: PropsWithChildren) => (
  <main className={styles['main']}>{children}</main>
)

export default Page
