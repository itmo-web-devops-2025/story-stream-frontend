import { PathRoute } from '@/constants/core/path-route.constant'
import Icon from '@/shared/core/icon/icon'
import Text from '@/shared/ui/text/text'
import { Post } from '@/types/post/post.interface'
import { dateFormat } from '@/utils/date-format.util'
import type { FC, PropsWithChildren, ReactNode } from 'react'
import { Link } from 'react-router'
import styles from './articles.module.css'

type ItemProps = {
  article: Post
}

const Item: FC<PropsWithChildren<ItemProps>> = ({ article }) => (
  <li>
    <article className={styles.article}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          <Link
            className={styles.link}
            to={`${PathRoute.Articles}/${article.id}`}
          >
            {article.title}
          </Link>
        </h2>
        <div className={styles['footer-things']}>
          <div className={styles['footer-item']} role='button'>
            <Icon icon='heart' />
            <span>{article.likes.length}</span>
          </div>
          <div className={styles['footer-item']} role='button'>
            <Icon icon='comment-1' />
            <span>{article.comments.length}</span>
          </div>
        </div>
      </header>
      <section>
        <Text.Paragraph intrigued={true}>{article.body}</Text.Paragraph>
      </section>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.meta}>
            {dateFormat(article.createdAt)}, {article.user.username}
          </p>
        </div>
      </footer>
    </article>
  </li>
)

const List = ({ children }: { children: ReactNode }) => (
  <ol className={styles.articles}>{children}</ol>
)

type Props = {
  posts?: Post[]
  children?: ReactNode
}

const Articles = ({ children }: Props) => (
  <div className={styles.container}>{children}</div>
)

Articles.Item = Item
Articles.List = List
export default Articles
