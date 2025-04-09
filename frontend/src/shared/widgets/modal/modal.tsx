import ButtonIcon from '@/shared/ui/button-icon/button-icon'
import { ModalProps } from '@/shared/widgets/modal/modal.type'
import cn from 'classnames'
import { FC, PropsWithChildren, useEffect } from 'react'

import styles from './modal.module.css'

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  open = false,
  title,
  onClose,
  children
}) => {
  useEffect(() => {
    const main = document.querySelector('main')
    if (!main) return

    if (open) {
      main.setAttribute('data-open', 'true')
    } else {
      main.removeAttribute('data-open')
    }

    // Очистка на размонтирование
    return () => {
      main.removeAttribute('data-open')
    }
  }, [open])

  useEffect(() => {
    if (open && onClose) {
      const handleCloseKeyDown = (evt: KeyboardEvent) => {
        if (evt.key === 'Escape') {
          onClose()
        }
      }

      document.addEventListener('keydown', handleCloseKeyDown)

      return () => {
        document.removeEventListener('keydown', handleCloseKeyDown)
      }
    }
  }, [onClose, open])

  return (
    <div className={styles.overlay} data-open={open}>
      <dialog
        className={cn(styles.dialog)}
        data-open={open}
        aria-labelledby='dialog-name'
      >
        <h2 id='dialog-name' className={styles.header}>
          {title}
        </h2>
        <div className={styles.body}>{children}</div>
        <ButtonIcon
          className={styles.closeButton}
          icon={'xmark'}
          onClick={onClose}
        />
      </dialog>
    </div>
  )
}

export default Modal
