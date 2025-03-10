import type { PropsWithChildren } from 'react'
import styles from './page.module.css'

const Page = ({ children }: PropsWithChildren) => (
  <body className={styles['body']}>{children}</body>
)

export default Page
