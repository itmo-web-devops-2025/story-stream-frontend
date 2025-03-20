import { mockUsers } from '@/mock/user/users.mock'
import { Article } from '@/types/article/article.interface'

const generateArticles = (): Article[] => {
  const articles: Article[] = []
  const titles = [
    'How to Learn TypeScript',
    'JavaScript ES6 Features',
    'Understanding Async Await',
    'React vs Angular',
    'CSS Grid vs Flexbox',
    'Top 5 Frontend Frameworks',
    'Exploring Node.js',
    'What is WebAssembly?',
    'Best Practices for REST APIs',
    'Understanding JWT Authentication',
    'GraphQL vs REST',
    'Creating a Blog with React',
    'Getting Started with Docker',
    'Optimizing Web Performance',
    'Modern JavaScript Tools'
  ]

  for (let i = 0; i < 15; i++) {
    const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)]
    const article: Article = {
      slug: titles[i].toLowerCase().replace(/ /g, '-'),
      title: titles[i],
      description: `A detailed article about ${titles[i].toLowerCase()}.`,
      body: `This is the body content for the article titled "${titles[i]}". More detailed content goes here.`,
      createdAt: new Date(),
      updatedAt: new Date(),
      favorited: false,
      favoritesCount: 0,
      author: randomUser
    }
    articles.push(article)
  }

  return articles
}

const articlesMock = generateArticles()
export default articlesMock
