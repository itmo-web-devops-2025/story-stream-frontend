import styles from '@/features/article/article-content/article-content.module.css'
import CommentList from '@/features/comment/comment-list'
import type { Post } from '@/types/post/post.interface'
import { capitalizeWords } from '@/utils/capitalize-word.util'
import { dateFormat } from '@/utils/date-format.util'
import 'ckeditor5/ckeditor5.css'

type ArticleProps = {
  article?: Post
}

const ArticleContent = ({ article }: ArticleProps) => {
  if (!article) {
    return null
  }

  return (
    <div className={styles.article}>
      <div className={styles.header}>
        <div className={styles.metaBlock}>
          <p className={styles.author}>
            {capitalizeWords(article.user.username)}
          </p>
          <div className={styles.date}>
            <p className={styles.date}>{dateFormat(article.createdAt)} год</p>
          </div>
        </div>
      </div>
      <div className={styles.body}>{article.body}</div>
      <CommentList comments={article.comments} />
    </div>
  )
}

export default ArticleContent
