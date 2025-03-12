import Icon from '@/shared/core/icon/icon'
import type { FC } from 'react'

import styles from './articles.module.css'

type TProps = {}

const Articles: FC<TProps> = () => {
  console.log(`Articles component is working`)

  return (
    <section className={styles.container}>
      <ol className={styles.articles}>
        <li>
          <article className={styles.article}>
            <header className={styles.header}>
              <h2 className={styles.title}>Заголовок статьи</h2>
            </header>
            <section className={styles.content}>
              <p>
                Здесь основной контент статьи. Можно разбить его на несколько
                разделов.
              </p>
            </section>
            <footer className={styles.footer}>
              <p className={styles.meta}>12 марта 2025 Иван Иванов | 6 мин</p>
              <div>
                <span>
                  5 <Icon icon='comment-1' />
                </span>
                <span>
                  2 <Icon icon='heart' />
                </span>
              </div>
            </footer>
          </article>
        </li>
      </ol>
      <aside aria-label='Оглавление' className={styles.aside}>
        <ol>
          <li>Статья 1</li>
          <li>Статья 2</li>
          <li>Статья 3</li>
        </ol>
      </aside>
    </section>
  )
}

export default Articles
