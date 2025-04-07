import { useCreateCommentMutation } from '@/services/api/comment.api'
import Button from '@/shared/ui/button/button'
import Textarea from '@/shared/ui/textarea/textarea'
import Form from '@/shared/widgets/form/form'
import { isDefined } from '@/utils/is-defined.util'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import { z } from 'zod'
import styles from './comments.module.css'

const schema = z.object({
  content: z
    .string()
    .min(1, 'Поле обязательно')
    .max(1500, 'Максимальное количество символов 1500')
})

const CommentsForm = () => {
  const { articleId } = useParams()
  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onSubmit'
  })

  const { mutateAsync: createComment } = useCreateCommentMutation()
  const {
    handleSubmit,
    formState: { isSubmitting }
  } = form

  const handleFormSubmit = handleSubmit(async (data) => {
    if (!isDefined(articleId)) {
      throw new Error('articleId is not defined')
    }
    try {
      await createComment({
        postId: articleId,
        body: {
          text: data.content
        }
      })
    } catch (e) {
      console.error(e)
    }
  })
  return (
    <Form form={form} className={styles.form} onSubmit={handleFormSubmit}>
      <Form.Item name='content'>
        <Textarea placeholder='Напишите комментарий' />
      </Form.Item>
      <Button type='submit' disabled={isSubmitting}>
        Отправить
      </Button>
    </Form>
  )
}

export default CommentsForm
