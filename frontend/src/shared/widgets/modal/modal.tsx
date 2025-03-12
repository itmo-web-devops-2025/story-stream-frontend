import type { FC, PropsWithChildren } from 'react'

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

  return (
    <div className={styles.modalOverlay} onClick={onClose} data-opened={open}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
