import { AppConfig } from '@/config/app.config'
import App from '@/pages/app'
import { getApiBaseUrl } from '@/utils/get-api-base-url.util'
import dayjs from 'dayjs'
import 'dayjs/locale/ru.js'
import { createRoot } from 'react-dom/client'

import '@/assets/styles/index.css'

dayjs.locale(AppConfig.Locale)
createRoot(document.getElementById('root')!).render(<App />)
console.log(`Подключение к серверу: ${getApiBaseUrl()}`)
