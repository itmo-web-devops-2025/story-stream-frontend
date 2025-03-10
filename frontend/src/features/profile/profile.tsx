import useGetQuery from '@/hooks/use-get-query.hook'
import { getUser } from '@/services/user.api'
import ButtonIcon from '@/shared/controllers/button-icon/button-icon'
import { User } from '@/types/user.interface'
import { capitalizeWords } from '@/utils/capitalize-word.util'
import type { FC } from 'react'

import styles from './profile.module.css'

const Profile: FC = () => {
  const { data: user } = useGetQuery<User>(getUser)

  console.log(user)

  return (
    <section>
      <div className={styles['profile']}>
        {user && (
          <>
            <div className={styles['username-container']}>
              <h2 className={styles['username']}>
                {capitalizeWords(user?.username)}
              </h2>
              <ButtonIcon className={styles['button']} icon='pencil-1' />
            </div>
            <span className={styles['bio']}>{user?.bio}</span>
          </>
        )}
      </div>
    </section>
  )
}

export default Profile
