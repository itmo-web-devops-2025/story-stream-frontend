import { useAuthLoginMutation } from '@/services/api/auth.api'
import Button from '@/shared/ui/button/button'
import Input from '@/shared/ui/input/input'
import AppLink from '@/shared/ui/link/app-link'
import Card from '@/shared/widgets/card/card'
import Form from '@/shared/widgets/form/form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  username: z.string(),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов')
})

const Authorization: FC = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onSubmit'
  })
  const { mutateAsync: authLogin } = useAuthLoginMutation()

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = form

  console.dir(document.cookie)
  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      const response = await authLogin({
        body: {
          login: data.username,
          password: data.password
        }
      })
      console.log('response', response)
    } catch (e) {
      console.error(e)
    }
  })

  return (
    <Card>
      <Form form={form} onSubmit={handleFormSubmit}>
        <Form.Item name='username' label='Имя пользователя'>
          <Input type='username' placeholder='Введите имя пользователя' />
        </Form.Item>
        <Form.Item name='password' label='Пароль'>
          <Input type='password' placeholder='Введите пароль' />
        </Form.Item>
        <Button type='submit' disabled={isSubmitting}>
          Войти
        </Button>
      </Form>
      <Card.Text>
        Нет учётной записи? <AppLink to='/sign-up'>Зарегистрироваться</AppLink>
      </Card.Text>
    </Card>
  )
}

export default Authorization
