import Icon from '@/shared/core/icon/icon'
import cn from 'classnames'
import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import styles from './button-icon.module.css'

type TProps = {
  icon: string
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const ButtonIcon: FC<TProps> = ({ icon, className, ...props }) => (
    <button {...props} className={cn(className, styles['button'])}>
      <Icon icon={icon} />
    </button>
  )

export default ButtonIcon
