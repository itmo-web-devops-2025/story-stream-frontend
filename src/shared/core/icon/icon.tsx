import cn from 'classnames'
import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import styles from './icon.module.css'

type TProps = {
  icon: string
  isFilled?: boolean
} & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>

const Icon: FC<TProps> = ({ icon, className, isFilled = false, ...props }) => (
  <i
    className={cn(className, `lni lni-${icon}`, {
      [styles.iconFilled]: isFilled
    })}
    data-testid='icon'
    {...props}
  ></i>
)

export default Icon
