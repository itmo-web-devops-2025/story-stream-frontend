import Aside from '@/features/articles/components/aside/aside'
import Icon from '@/shared/core/icon/icon'
import type { FC, PropsWithChildren, ReactNode } from 'react'

import styles from './articles.module.css'

const Item: FC<PropsWithChildren> = () => (
  <li>
    <article className={styles.article}>
      <header className={styles.header}>
        <h2 className={styles.title}>Заголовок статьи</h2>
        <div className={styles['footer-things']}>
          <div className={styles['footer-item']} role='button'>
            <Icon icon='heart' />
            <span>2</span>
          </div>
          <div className={styles['footer-item']} role='button'>
            <Icon icon='comment-1' />
            <span>5</span>
          </div>
        </div>
      </header>
      <section className={styles.content}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
          deleniti ea est nesciunt nisi, odit repellendus vel? Animi ipsum
          nesciunt nobis repellat. Animi debitis eligendi, illo numquam porro
          quasi suscipit?
        </p>
      </section>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.meta}>12 марта 2025, Иван Иванов, 6 мин</p>
        </div>
      </footer>
    </article>
  </li>
)

type Props = {
  children?: ReactNode
}

const Articles = ({ children }: Props) => {
  console.log(`Articles component is working`)

  return (
    <section className={styles.container}>
      <ol className={styles.articles}>{children}</ol>
      <Aside />
    </section>
  )
}

Articles.Item = Item
export default Articles
