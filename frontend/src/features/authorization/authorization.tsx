import Button from '@/shared/controllers/button/button'
import Input from '@/shared/controllers/input/input'
import AppLink from '@/shared/controllers/link/app-link'
import Card from '@/shared/widgets/card/card'
import Form from '@/shared/widgets/form/form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов')
})

const Authorization: FC = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onSubmit'
  })

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = form

  const handleFormSubmit = handleSubmit(async (data) => {})

  return (
    <Card>
      <Card.Title>Авторизация</Card.Title>
      <Form form={form} onSubmit={handleFormSubmit}>
        <Form.Item name='email' label='Электронная почта'>
          <Input type='email' placeholder='Введите электронную почту' />
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
