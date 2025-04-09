import cn from 'classnames'
import type {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  PropsWithChildren
} from 'react'

import styles from './text.module.css'

type TProps = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
> & {
  intrigued?: boolean
}

const Paragraph: FC<PropsWithChildren<TProps>> = ({
  intrigued,
  children,
  className,
  ...rest
}) => (
  <p
    {...rest}
    className={cn(styles.text, { [styles.textIntrigue]: intrigued }, className)}
  >
    {children}
  </p>
)

// Определяем объект с компонентами и типизируем его
const Text = ({ children }: PropsWithChildren) => <>{children}</>

Text.Paragraph = Paragraph
export default Text
