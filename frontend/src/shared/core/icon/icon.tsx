import type { FC } from 'react'

type TProps = {
  icon: string
}

const Icon: FC<TProps> = ({ icon }) => <i className={`lni lni-${icon}`}></i>

export default Icon
