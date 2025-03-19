import { useCreateUserMutation } from '@/services/api/user.api'
import Button from '@/shared/controllers/button/button'
import Input from '@/shared/controllers/input/input'
import AppLink from '@/shared/controllers/link/app-link'
import Card from '@/shared/widgets/card/card'
import Form from '@/shared/widgets/form/form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const schema = z.object({
  username: z.string(),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов')
})

const Registration: FC = () => {
  const { mutateAsync: createUser, isPending } = useCreateUserMutation()

  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onSubmit'
  })

  const { handleSubmit } = form

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      const user = await createUser({ body: data })

      console.log('user', user)
      toast(`${user.data.username}, добро пожаловать`)
    } catch (e) {
      console.error(e)
    }
  })

  return (
    <Card>
      <Card.Title>Регистрация</Card.Title>
      <Form form={form} onSubmit={handleFormSubmit}>
        <Form.Item name='username' label='Никнейм'>
          <Input type='text' placeholder='Введите никнейм' />
        </Form.Item>
        <Form.Item name='password' label='Пароль'>
          <Input type='password' placeholder='Введите пароль' />
        </Form.Item>
        <Button type='submit' disabled={isPending}>
          Зарегистрироваться
        </Button>
      </Form>
      <Card.Text>
        Есть учётная запись? <AppLink to='/sign-in'>Войти</AppLink>
      </Card.Text>
    </Card>
  )
}

export default Registration
