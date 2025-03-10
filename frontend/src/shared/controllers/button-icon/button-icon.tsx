import cn from 'classnames'
import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import styles from './button-icon.module.css'

type TProps = {
  icon: string
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const ButtonIcon: FC<TProps> = ({ icon, className, ...props }) => {
  console.log(`ButtonIcon component is working`)

  return (
    <button {...props} className={cn(className, styles['button'])}>
      <i className={`lni lni-${icon}`}></i>
    </button>
  )
}

export default ButtonIcon
