import { createContext } from 'react'

export const FormItemContext = createContext<{
  name: string | null
}>({ name: null })
