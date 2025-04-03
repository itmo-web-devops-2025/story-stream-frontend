import { useCreatePostMutation } from '@/services/api/post.api'
import Button from '@/shared/ui/button/button'
import Input from '@/shared/ui/input/input'
import Form from '@/shared/widgets/form/form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import styles from './add-article.module.css'

const schema = z.object({
  title: z.string().min(3, 'Минимальная длина заголовка 3 символа'),
  body: z.string().min(50, 'Минимальная длина текста 50 символа')
})

const AddArticle: FC = () => {
  console.log(`AddArticle component is working`)

  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onSubmit'
  })

  const { mutateAsync: createPost } = useCreatePostMutation()
  const {
    handleSubmit,
    register,
    formState: { isSubmitting }
  } = form

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      await createPost({
        body: {
          title: data.title,
          body: data.body
        }
      })
    } catch (e) {
      console.error(e)
    }
  })

  return (
    <Form form={form} onSubmit={handleFormSubmit}>
      <Form.Item name='title' label='Заголовок'>
        <Input type='title' placeholder='Введите заголовок' />
      </Form.Item>
      <Form.Item name='body' label='Текст статьи'>
        <textarea
          className={styles.textarea}
          placeholder='Введите текст статьи'
          {...register('body')}
        />
      </Form.Item>

      <Button type='submit' disabled={isSubmitting}>
        Добавить статью
      </Button>
    </Form>
  )
}

export default AddArticle
