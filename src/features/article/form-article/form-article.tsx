import { PathRoute } from '@/constants/core/path-route.constant'
import { ModeForm } from '@/enum/core/mode-form.enum'
import {
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation
} from '@/services/api/post.api'
import Button from '@/shared/ui/button/button'
import Input from '@/shared/ui/input/input'
import Textarea from '@/shared/ui/textarea/textarea'
import Form from '@/shared/widgets/form/form'
import { Post } from '@/types/post/post.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(3, 'Минимальная длина заголовка 3 символа'),
  body: z.string().min(50, 'Минимальная длина текста 50 символа')
})

type TProps = {
  mode: ModeForm
  article?: Post
  onSetModeForm?: Dispatch<SetStateAction<ModeForm>>
}

const FormArticle = ({ mode, article, onSetModeForm }: TProps) => {
  const navigate = useNavigate()
  const isEditMode = mode === ModeForm.EDIT
  const isAddMode = mode === ModeForm.ADD
  const isDeleteMode = mode === ModeForm.DELETE
  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onSubmit'
  })

  useEffect(() => {
    if (isEditMode && article) {
      form.setValue('title', article.title)
      form.setValue('body', article.body)
    }
  }, [article, form, isEditMode])

  const { mutateAsync: createPost } = useCreatePostMutation()
  const { mutateAsync: updatePost } = useUpdatePostMutation()
  const { mutateAsync: deletePost } = useDeletePostMutation()
  const {
    handleSubmit,
    formState: { isSubmitting }
  } = form

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      if (isAddMode) {
        await createPost({ body: data })
        toast('Статья создана')
      } else if (isEditMode && article) {
        await updatePost({ postId: article.id, body: data })
        toast('Статья отредактирована')
      } else if (isDeleteMode && article) {
        await deletePost({ postId: article.id })
        navigate(PathRoute.Home)
        toast('Статья удалена')
      }

      onSetModeForm?.(ModeForm.CLOSE)
    } catch (error) {
      console.error('Ошибка при обработке формы:', error)
    }
  })

  const titleButton = (() => {
    if (isEditMode) {
      return 'Редактировать статью'
    }

    if (isAddMode) {
      return 'Добавить статью'
    }

    if (isDeleteMode) {
      return 'Удалить статью'
    }
  })()

  return (
    <Form form={form} onSubmit={handleFormSubmit}>
      {!isDeleteMode && (
        <>
          <Form.Item name='title' label='Заголовок'>
            <Input type='text' placeholder='Введите заголовок' />
          </Form.Item>
          <Form.Item name='body' label='Текст статьи'>
            <Textarea
              placeholder='Введите текст статьи'
              onSubmit={handleFormSubmit}
            />
          </Form.Item>
        </>
      )}

      {isDeleteMode && article && (
        <p>
          Вы уверены, что хотите удалить статью{' '}
          <strong>«{article.title}»</strong>?
        </p>
      )}

      <Button type='submit' disabled={isSubmitting}>
        {titleButton}
      </Button>
    </Form>
  )
}

export default FormArticle
