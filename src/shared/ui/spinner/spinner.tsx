import type { FC } from 'react'

import styles from './spinner.module.css'

const Spinner: FC = () => (
    <div className={styles.container}>
      <div className={styles.spinner} />
    </div>
  )

export default Spinner
