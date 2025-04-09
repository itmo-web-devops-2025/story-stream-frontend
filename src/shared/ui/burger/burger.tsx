import type { FC } from 'react'
import styles from './burger.module.css'

const Burger: FC = () => (
  <button className={styles['burger-button']}>
    <i className='lni lni-menu-hamburger-1'></i>
  </button>
)

export default Burger
