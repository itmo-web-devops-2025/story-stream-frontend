import { FC } from 'react'
import { Link } from 'react-router'
import styles from './logo.module.css'

const Logo: FC = () => (
  <Link to='/' className={styles['logo']}>
    Story <span className={styles['accent']}>Stream</span>
  </Link>
)

export default Logo
