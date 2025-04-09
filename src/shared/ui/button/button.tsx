import { ButtonProps } from '@/types/core/button-props.type'
import type { PropsWithChildren } from 'react'
import styles from './button.module.css'

const Button = ({ children, ...props }: PropsWithChildren<ButtonProps>) => (
  <button className={styles.button} {...props}>
    {children}
  </button>
)

export default Button
