import ButtonIcon from '@/shared/ui/button-icon/button-icon'
import { MouseEventHandler } from 'react'
import styles from './article-tools.module.css'

type TProps = {
  onAddButtonClick: MouseEventHandler<HTMLButtonElement>
}

const ArticleTools = ({ onAddButtonClick }: TProps) => (
  <div className={styles.articleTools}>
    <ButtonIcon icon='plus' onClick={onAddButtonClick}>
      Добавить статью
    </ButtonIcon>
  </div>
)

export default ArticleTools
