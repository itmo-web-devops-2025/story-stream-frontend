import { ReactNode } from 'react'
import styles from './article-tools.module.css'

type TProps = {
  children: ReactNode
}

const ArticleTools = ({ children }: TProps) => (
  <div className={styles.articleTools}>
    <div className={styles.buttons}>{children}</div>
  </div>
)

export default ArticleTools
