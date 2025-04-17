import { PathRoute } from '@/constants/core/path-route.constant'
import { useAuth } from '@/contexts/auth/use-auth.hook'
import { useLikePostMutation } from '@/services/api/post.api'
import Icon from '@/shared/core/icon/icon'
import Heart from '@/shared/icons/heart/heart'
import Text from '@/shared/ui/text/text'
import { Post } from '@/types/post/post.interface'
import { dateFormat } from '@/utils/date-format.util'
import cn from 'classnames'
import type { FC, PropsWithChildren, ReactNode } from 'react'
import { Link } from 'react-router'
import styles from './articles.module.css'

type ItemProps = {
  article: Post
}

const Item: FC<PropsWithChildren<ItemProps>> = ({ article }) => {
  const { user } = useAuth()
  const { mutateAsync: createPost } = useLikePostMutation()

  const handleToggleLike = async () => {
    try {
      await createPost({ postId: article.id })
    } catch (e) {
      console.error(e)
    }
  }

  const hasCurrentUser = article.likes.some((like) => like.user.id === user?.id)

  return (
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
            <div
              className={cn(styles['footer-item'], {
                [styles.selected]: true
              })}
              role='button'
              onClick={handleToggleLike}
            >
              <Heart isFill={hasCurrentUser} />
              <span>{article.likes.length}</span>
            </div>
            <div className={cn(styles['footer-item'], styles.commentButton)}>
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
}

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
