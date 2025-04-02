import { useCreatePostMutation } from '@/services/api/post.api'
import Button from '@/shared/ui/button/button'
import Input from '@/shared/ui/input/input'
import CkEditor from '@/shared/widgets/ck-editor/ck-editor'
import Form from '@/shared/widgets/form/form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type TProps = {}

const schema = z.object({
  title: z.string().min(3, 'Минимальная длина заголовка 3 символа'),
  body: z.string().min(50, 'Минимальная длина текста 50 символа')
})

const AddArticle: FC<TProps> = () => {
  console.log(`AddArticle component is working`)

  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onSubmit'
  })

  const { mutateAsync: createPost } = useCreatePostMutation()
  const {
    handleSubmit,
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
      <Form.Item name='title' label='Заголловок'>
        <Input type='title' placeholder='Введите заголовок' />
      </Form.Item>
      <Form.Item name='body' label='Текст статьи'>
        <CkEditor />
      </Form.Item>

      <Button type='submit' disabled={isSubmitting}>
        Добавить статью
      </Button>
    </Form>
  )
}

export default AddArticle
