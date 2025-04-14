import { AuthContextType } from '@/contexts/auth/auth.type'
import { createContext } from 'react'

export const AuthContext = createContext<AuthContextType | null>(null)
