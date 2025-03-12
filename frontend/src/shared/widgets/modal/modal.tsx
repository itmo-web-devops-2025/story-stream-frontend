import ButtonIcon from '@/shared/controllers/button-icon/button-icon'
import { FC, PropsWithChildren, useEffect } from 'react'

import styles from './modal.module.css'

type TProps = {
  open?: boolean
  onClose?: () => void
}

const Modal: FC<PropsWithChildren<TProps>> = ({
  open = false,
  onClose,
  children
}) => {
  console.log(`Modal component is working`)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className={styles.modalOverlay} data-open={open}>
      <dialog
        className={styles.container}
        open={open}
        onClick={onClose}
        aria-labelledby='dialog-name'
      >
        <h2 id='dialog-name' className={styles.title}>
          Заголовок
        </h2>
        <div className={styles.content}>{children}</div>
        <ButtonIcon
          className={styles['button']}
          icon={'xmark'}
          onClick={onClose}
        />
      </dialog>
    </div>
  )
}

export default Modal
