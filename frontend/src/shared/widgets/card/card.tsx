import styles from '@/features/authorization/authorization.module.css'
import { DivProps } from '@/types/core/div-props.type'
import { HeadingProps } from '@/types/core/heading-props.type'
import { ParagraphProps } from '@/types/core/paragraph-props.type'
import type { PropsWithChildren } from 'react'

const Text = ({ children }: ParagraphProps) => (
  <p className={styles.text}>{children}</p>
)

const Title = ({ children, ...props }: PropsWithChildren<HeadingProps>) => (
  <h2 className={styles.title} {...props}>
    {children}
  </h2>
)

const Card = ({ children }: PropsWithChildren<DivProps>) => (
  <div className={styles.container}>{children}</div>
)

Card.Title = Title
Card.Text = Text
export default Card
