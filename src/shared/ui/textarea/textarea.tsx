import { FormItemContext } from '@/contexts/form-item.context'
import cn from 'classnames'
import {
  DetailedHTMLProps,
  FC,
  TextareaHTMLAttributes,
  useContext
} from 'react'
import { useFormContext } from 'react-hook-form'
import styles from './textarea.module.css'

type TProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

const Textarea: FC<TProps> = ({ className, onSubmit, ...props }: TProps) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()
  const context = useContext(FormItemContext)

  if (!context?.name) {
    console.warn('TextArea must be inside a Form.Item with a name')
    return null
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit?.(e)
    }
  }

  return (
    <textarea
      {...register(context.name)}
      className={cn(styles.textarea, className, {
        [styles.error]: errors[context.name]
      })}
      onKeyDown={handleKeyDown}
      {...props}
      onSubmit={handleKeyDown}
    />
  )
}

export default Textarea
