import Aside from '@/features/articles/components/aside/aside'
import Icon from '@/shared/core/icon/icon'
import Text from '@/shared/ui/text/text'
import type { FC, PropsWithChildren, ReactNode } from 'react'
import { Link, To } from 'react-router'

import styles from './articles.module.css'

type ItemProps = {
  href: To
}

const Item: FC<PropsWithChildren<ItemProps>> = ({ href }) => (
  <li>
    <article className={styles.article}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          <Link className={styles.link} to={href}>
            Заголовок статьи
          </Link>
        </h2>
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
      <section>
        <Text intrigued={true}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
          deleniti ea est nesciunt nisi, odit repellendus vel? Animi ipsum
          nesciunt nobis repellat. Animi debitis eligendi, illo numquam porro
          quasi suscipit?
        </Text>
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
    <div className={styles.container}>
      <ol className={styles.articles}>{children}</ol>
      <Aside />
    </div>
  )
}

Articles.Item = Item
export default Articles
