import { useAuth } from '@/contexts/auth.context'
import { AuthStatus } from '@/enum/core/auth-status.enum'
import ButtonIcon from '@/shared/ui/button-icon/button-icon'
import { MouseEventHandler } from 'react'
import styles from './article-tools.module.css'

type TProps = {
  onAddButtonClick: MouseEventHandler<HTMLButtonElement>
}

const ArticleTools = ({ onAddButtonClick }: TProps) => {
  const { authStatus } = useAuth()

  return (
    <div className={styles.articleTools}>
      <div className={styles.buttons}>
        {authStatus === AuthStatus.AUTHENTICATED && (
          <>
            <ButtonIcon icon='plus' onClick={onAddButtonClick}>
              Добавить статью
            </ButtonIcon>
          </>
        )}
      </div>
    </div>
  )
}

export default ArticleTools
