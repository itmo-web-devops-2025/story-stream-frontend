import CommentsForm from '@/features/comment/components/comments/components/comments-form/comments-form'
import type { ReactNode } from 'react'
import styles from './comments.module.css'

const Item = ({ author, content }: { author: string; content: string }) => (
  <li className={styles.comment}>
    <h4 className={styles.authorComment}>{author}</h4>
    <p className={styles.commentContent}>{content}</p>
  </li>
)

const List = ({ children }: { children: ReactNode }) => (
  <ul className={styles.commentsList}>{children}</ul>
)

const Comments = ({ children }: { children: ReactNode }) => (
  <div className={styles.comments}>
    <h3 className={styles.commentsTitle}>Комментарии</h3>
    {children}
    <CommentsForm />
  </div>
)

Comments.Item = Item
Comments.List = List
export default Comments
