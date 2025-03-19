import type { PropsWithChildren } from 'react'

import styles from './content.module.css'

const Content = ({ children }: PropsWithChildren) => (
  <section className={styles['content']}>{children}</section>
)

export default Content
