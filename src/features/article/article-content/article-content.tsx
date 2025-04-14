import { useAuth } from '@/contexts/auth/use-auth.hook'
import { AuthStatus } from '@/enum/core/auth-status.enum'
import { ModeForm } from '@/enum/core/mode-form.enum'
import styles from '@/features/article/article-content/article-content.module.css'
import ArticleTools from '@/features/article/article-tools/article-tools'
import FormArticle from '@/features/article/form-article/form-article'
import CommentList from '@/features/comment/comment-list'
import ButtonIcon from '@/shared/ui/button-icon/button-icon'
import Modal from '@/shared/widgets/modal/modal'
import { ModalProps } from '@/shared/widgets/modal/modal.type'
import type { Post } from '@/types/post/post.interface'
import { capitalizeWords } from '@/utils/capitalize-word.util'
import { dateFormat } from '@/utils/date-format.util'
import 'ckeditor5/ckeditor5.css'
import { useState } from 'react'

type ArticleProps = {
  article?: Post
}

const ArticleContent = ({ article }: ArticleProps) => {
  const { authStatus, user } = useAuth()
  const [modeForm, setModeForm] = useState<ModeForm>(ModeForm.CLOSE)

  const isAuthorArticle = article?.user.id === user?.id

  if (!article) {
    return null
  }

  const handleEditArticleClick = () => {
    setModeForm(ModeForm.EDIT)
  }

  const handleDeleteArticleClick = () => {
    setModeForm(ModeForm.DELETE)
  }

  const modalProps = (() => {
    if (modeForm === ModeForm.ADD) {
      return null
    }

    const mapModeProps: Record<Exclude<ModeForm, ModeForm.ADD>, ModalProps> = {
      [ModeForm.EDIT]: {
        open: true,
        title: 'Редактировать статью'
      },
      [ModeForm.DELETE]: {
        open: true,
        title: 'Удаление статьи'
      },
      [ModeForm.CLOSE]: {
        open: false,
        title: null
      }
    }

    return mapModeProps[modeForm]
  })()

  return (
    <div className={styles.article}>
      <div className={styles.header}>
        {authStatus === AuthStatus.AUTHENTICATED && isAuthorArticle && (
          <ArticleTools>
            <ButtonIcon icon='pen-to-square' onClick={handleEditArticleClick}>
              Редактировать статью
            </ButtonIcon>
            <ButtonIcon icon='trash-3' onClick={handleDeleteArticleClick}>
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
        open={modalProps?.open}
        title={modalProps?.title || null}
        onClose={() => setModeForm(ModeForm.CLOSE)}
      >
        <FormArticle
          mode={modeForm}
          article={article}
          onSetModeForm={setModeForm}
        />
      </Modal>
    </div>
  )
}

export default ArticleContent
