import { User } from '@/types/user/user.interface'

export const mockUsers: User[] = [
  {
    id: '0',
    username: 'alice greene',
    bio: 'Frontend developer with a passion for design',
    password: '1234'
  },
  {
    id: '1',
    username: 'bob franco',
    bio: 'Backend engineer, Golang enthusiast',
    password: '1234'
  },
  {
    id: '2',
    username: 'charlie donovan',
    bio: 'DevOps specialist, cloud solutions architect',
    password: '1234'
  },
  {
    id: '3',
    username: 'dave graham',
    bio: 'Fullstack developer, loves TypeScript',
    password: '1234'
  },
  {
    id: '4',
    username: 'eve bailey',
    bio: 'Cybersecurity expert, ethical hacker',
    password: '1234'
  }
] as const
