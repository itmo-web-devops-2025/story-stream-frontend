import { useGetUser, useUpdateUserMutation } from '@/services/api/user.api'
import Button from '@/shared/ui/button/button'
import Textarea from '@/shared/ui/textarea/textarea'
import Card from '@/shared/widgets/card/card'
import Form from '@/shared/widgets/form/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router'
import { z } from 'zod'

const schema = z.object({
  bio: z
    .string()
    .min(1, 'Имя пользователя обязательно')
    .max(255, 'Описание пользователя не может быть больше 255 символов')
})

const ProfileSetting: FC = () => {
  const { userId } = useParams()
  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onSubmit'
  })

  const { data: userRepose } = useGetUser(userId)
  const { mutateAsync: updateUser } = useUpdateUserMutation()

  const user = userRepose?.data

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting }
  } = form

  useEffect(() => {
    if (user) {
      setValue('bio', user.bio || '')
    }
  }, [setValue, user])

  const handleFormSubmit = handleSubmit(async (data) => {
    if (userId === undefined || userId === null) {
      throw new Error('ID is not defined')
    }

    try {
      const result = await updateUser({
        userId: userId,
        body: data
      })

      console.log(result)
      toast(`Информация успешно обновлена`)
    } catch (e) {
      const error = e as AxiosError<{ message: string }>
      console.error(error)
    }
  })

  return (
    <Card>
      <Form form={form} onSubmit={handleFormSubmit}>
        <Form.Item name='bio' label='Информация о пользователе'>
          <Textarea onSubmit={handleFormSubmit} />
        </Form.Item>
        <Button type='submit' disabled={isSubmitting}>
          Обновить
        </Button>
      </Form>
    </Card>
  )
}

export default ProfileSetting
