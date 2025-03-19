import { FormItemContext } from '@/contexts/form-item.context'
import cn from 'classnames'
import { FC, InputHTMLAttributes, useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import styles from './input.module.css'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input: FC<InputProps> = ({ name, ...props }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()
  const context = useContext(FormItemContext)

  if (!context?.name) {
    console.warn('Input must be inside a Form.Item with a name')
    return null
  }

  const inputClass = cn(styles['input'], {
    [styles.inputError]: errors[context.name],
    [styles.shake]: errors[context.name]
  })

  return (
    <input
      className={inputClass}
      {...register(context.name)}
      formNoValidate={false}
      {...props}
    />
  )
}

export default Input
