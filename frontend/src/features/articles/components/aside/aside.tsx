import type { FC } from 'react'

import styles from './aside.module.css'

const Aside: FC = () => {
  console.log(`Aside component is working`)

  return (
    <aside aria-label='Оглавление' className={styles.aside}>
      <ol className={styles.asideList}>
        <li className={styles.asideItem}>
          <a href='#'>Статья 1</a>
        </li>
        <li className={styles.asideItem}>
          <a href='#'>Статья 1</a>
        </li>
        <li className={styles.asideItem}>
          <a href='#'>Статья 1</a>
        </li>
      </ol>
    </aside>
  )
}

export default Aside
