import Text from '@/shared/ui/text/text'
import CkEditor from '@/shared/widgets/ck-editor/ck-editor'
import type { Article } from '@/types/article/article.interface'
import { dateFormat } from '@/utils/date-format.util'
import styles from './article.module.css'
import 'ckeditor5/ckeditor5.css'

type ArticleProps = {
  article: Article
}

const Article = ({ article }: ArticleProps) => {
  console.log(`Article component is working`)
  console.log(article)

  return (
    <div className={styles.article}>
      <div className={styles.header}>
        <h3 className={styles.description}>{article.description}</h3>
        <div className={styles.metaBlock}>
          <p className={styles.date}>{dateFormat(article.createdAt)}</p>
          <p className={styles.timeToRead}>6 мин.</p>
        </div>
        <p className={styles.author}>{article.author.username}</p>
      </div>

      <Text.Paragraph>{article.body}</Text.Paragraph>
      <div className={styles.comments}>
        <ul className={styles.commentsList}>
          <li className={styles.comment}>Comment 1</li>
          <li className={styles.comment}>Comment 2</li>
          <li className={styles.comment}>Comment 3</li>
          <li className={styles.comment}>Comment 4</li>
        </ul>
      </div>
      <CkEditor />
    </div>
  )
}

export default Article
