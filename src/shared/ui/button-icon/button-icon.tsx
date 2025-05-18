import Icon from '@/shared/core/icon/icon'
import cn from 'classnames'
import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  PropsWithChildren
} from 'react'
import styles from './button-icon.module.css'

export type ButtonIconProps = {
  icon: string
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const ButtonIcon: FC<PropsWithChildren<ButtonIconProps>> = ({
  icon,
  className,
  children,
  ...props
}) => (
  <button {...props} className={cn(className, styles['button'])}>
    <Icon icon={icon} />
    {children}
  </button>
)

export default ButtonIcon
