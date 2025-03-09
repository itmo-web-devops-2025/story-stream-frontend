import HeaderDefault from '@/features/header-default/header-default'
import type { FC } from 'react'

type TProps = {}

const Home: FC<TProps> = () => {
  console.log(`Home component is working`)

  return <HeaderDefault />
}

export default Home
