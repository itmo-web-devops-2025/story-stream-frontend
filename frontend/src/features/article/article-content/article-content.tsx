import styles from '@/features/article/article-content/article-content.module.css'
import Button from '@/shared/ui/button/button'
import Form from '@/shared/widgets/form/form'
import type { Article } from '@/types/article/article.interface'
import { capitalizeWords } from '@/utils/capitalize-word.util'
import { dateFormat } from '@/utils/date-format.util'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import 'ckeditor5/ckeditor5.css'

type ArticleProps = {
  article: Article
}

const schema = z.object({
  content: z.string()
})

const ArticleContent = ({ article }: ArticleProps) => {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onSubmit'
  })

  return (
    <div className={styles.article}>
      <div className={styles.header}>
        <div className={styles.metaBlock}>
          <p className={styles.author}>
            {capitalizeWords(article.author.username)}
          </p>
          <div className={styles.date}>
            <p className={styles.date}>{dateFormat(article.createdAt)} год</p>
          </div>
        </div>
        <h3 className={styles.description}>{article.description}</h3>
      </div>

      <div
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: article.body }}
      />
      <div className={styles.comments}>
        <h3 className={styles.commentsTitle}>Комментарии</h3>
        <ul className={styles.commentsList}>
          <li className={styles.comment}>
            <h4 className={styles.authorComment}>Ivan Ivanov</h4>
            <p className={styles.commentContent}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
              facilis fugit natus suscipit vel. Aliquam aliquid beatae
              cupiditate doloribus eaque error perspiciatis, repellat sint
              ullam!
            </p>
          </li>
          <li className={styles.comment}>
            <h4 className={styles.authorComment}>Ivan Ivanov</h4>
            <p className={styles.commentContent}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
              facilis fugit natus suscipit vel. Aliquam aliquid beatae
              cupiditate doloribus eaque error perspiciatis, repellat sint
              ullam!
            </p>
          </li>
          <li className={styles.comment}>
            <h4 className={styles.authorComment}>Denis Gromov</h4>
            <p className={styles.commentContent}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
              facilis fugit natus suscipit vel. Aliquam aliquid beatae
              cupiditate doloribus eaque error perspiciatis, repellat sint
              ullam! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Beatae dolor excepturi expedita, harum magnam molestias natus,
              nostrum numquam odio officiis omnis, quasi ratione saepe sint
              tempore. Accusantium blanditiis et nisi.
            </p>
          </li>
        </ul>
        <Form form={form} className={styles.form}>
          <Form.Item name='content'>
            <textarea
              placeholder='Напишите комментарий'
              className={styles.textArea}
            />
          </Form.Item>
          <Button type='submit'>Отправить</Button>
        </Form>
      </div>
    </div>
  )
}

export default ArticleContent
