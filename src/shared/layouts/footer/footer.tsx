import type { FC } from 'react'

import styles from './footer.module.css'

const Footer: FC = () => (
    <footer className={styles.footer}>
      <div className={styles.authors}>
        <ul className={styles['list']}>
          <li>
            <a href='https://github.com/IvanMonichev' target='_blank'>
              Frontend Ivan Monichev
            </a>
          </li>
          <li>
            <a href='https://github.com/TatarJesus' target='_blank'>
              Backend Stanislav Ziganshin
            </a>
          </li>
        </ul>
      </div>
      <p className={styles['copyright']}>
        Story Stream. Санкт-Петербург © {new Date().getFullYear()} г.
      </p>
    </footer>
  )

export default Footer
