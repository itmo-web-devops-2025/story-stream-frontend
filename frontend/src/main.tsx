import { AppConfig } from '@/config/app.config'
import { AuthProvider } from '@/contexts/auth.context'
import App from '@/pages/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import dayjs from 'dayjs'
import 'dayjs/locale/ru.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@/assets/styles/index.css'

const queryClient = new QueryClient()
dayjs.locale(AppConfig.Locale)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
)
