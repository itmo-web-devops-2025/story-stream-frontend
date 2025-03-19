import type { FC } from 'react'

type TProps = {}

const Article: FC<TProps> = () => {
  console.log(`Article component is working`)

  return (
    <div className={styles.article}>
      <div />
    </div>
  )
}

export default Article
