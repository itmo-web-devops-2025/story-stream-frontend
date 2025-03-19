import { mockUsers } from '@/mock/user/users.mock'
import { User } from '@/types/user.interface'
import { getRandomItem } from '@/utils/get-random-item.util'

export const getUser = async (): Promise<User> => new Promise((resolve) => {
    setTimeout(() => resolve(getRandomItem(mockUsers)), 500)
  })
