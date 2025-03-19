import { User } from '@/types/user.interface'

export const mockUsers: User[] = [
  {
    email: 'alice@example.com',
    username: 'alice greene',
    bio: 'Frontend developer with a passion for design',
    token: 'token123'
  },
  {
    email: 'bob@example.com',
    username: 'bob franco',
    bio: 'Backend engineer, Golang enthusiast',
    token: 'token456'
  },
  {
    email: 'charlie@example.com',
    username: 'charlie donovan',
    bio: 'DevOps specialist, cloud solutions architect'
  },
  {
    email: 'dave@example.com',
    username: 'dave graham',
    bio: 'Fullstack developer, loves TypeScript',
    token: 'token789'
  },
  {
    email: 'eve@example.com',
    username: 'eve bailey',
    bio: 'Cybersecurity expert, ethical hacker'
  }
] as const
