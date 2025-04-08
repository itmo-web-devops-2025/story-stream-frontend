import { useAuth } from '@/contexts/auth.context'
import { AuthStatus } from '@/enum/core/auth-status.enum'
import styles from '@/features/article/article-content/article-content.module.css'
import AddArticle from '@/features/article/article-list/components/add-article/add-article'
import ArticleTools from '@/features/article/article-tools/article-tools'
import CommentList from '@/features/comment/comment-list'
import ButtonIcon from '@/shared/ui/button-icon/button-icon'
import Modal from '@/shared/widgets/modal/modal'
import type { Post } from '@/types/post/post.interface'
import { capitalizeWords } from '@/utils/capitalize-word.util'
import { dateFormat } from '@/utils/date-format.util'
import 'ckeditor5/ckeditor5.css'
import { useState } from 'react'

type ModeModal = 'edit' | 'delete' | null

type ArticleProps = {
  article?: Post
}

const ArticleContent = ({ article }: ArticleProps) => {
  const { authStatus } = useAuth()
  const [modeModal, setModeModal] = useState<ModeModal>(null)

  if (!article) {
    return null
  }

  const handleEditArticleClick = () => {
    setModeModal('edit')
  }

  return (
    <div className={styles.article}>
      <div className={styles.header}>
        {authStatus === AuthStatus.AUTHENTICATED && (
          <ArticleTools>
            <ButtonIcon icon='pen-to-square' onClick={handleEditArticleClick}>
              Редактировать статью
            </ButtonIcon>
            <ButtonIcon icon='trash-6' onClick={handleEditArticleClick}>
              Удалить статью
            </ButtonIcon>
          </ArticleTools>
        )}
        <div className={styles.metaBlock}>
          <p className={styles.author}>
            {capitalizeWords(article.user.username)}
          </p>
          <div className={styles.date}>
            <p className={styles.date}>{dateFormat(article.createdAt)} год</p>
          </div>
        </div>
      </div>
      <div className={styles.body}>{article.body}</div>
      <CommentList comments={article.comments} />
      <Modal
        open={openedModal}
        title='Редактировать статью'
        onClose={() => setModeModal(null)}
      >
        <AddArticle onOpenedModal={setOpenedModal} />
      </Modal>
    </div>
  )
}

export default ArticleContent
