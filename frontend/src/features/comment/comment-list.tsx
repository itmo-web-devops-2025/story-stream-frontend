import Comments from '@/features/comment/components/comments/comments'
import { Comment } from '@/types/comment/comment.interface'
import type { FC } from 'react'

type TProps = {
  comments: Comment[]
}

const CommentList: FC<TProps> = ({ comments }) => {
  console.log(`CommentList component is working`)

  return (
    <Comments>
      <Comments.List>
        {comments.map((comment) => (
          <Comments.Item
            key={comment.id}
            author={'Аноним'}
            content={comment.text}
          />
        ))}
      </Comments.List>
    </Comments>
  )
}

export default CommentList
