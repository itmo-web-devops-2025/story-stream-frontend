import { zodResolver } from '@hookform/resolvers/zod'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import styles from './AuthForm.module.css'

const schema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов')
})

const Authorization: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data) => {
    console.log('Авторизация: ', data)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Авторизация</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type='email'
            placeholder='Email'
            {...register('email')}
            className={styles.input}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.inputGroup}>
          <input
            type='password'
            placeholder='Пароль'
            {...register('password')}
            className={styles.input}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        <button type='submit' className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </div>
  )
}

export default Authorization
