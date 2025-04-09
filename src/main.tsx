import { AppConfig } from '@/config/app.config'
import App from '@/pages/app'
import dayjs from 'dayjs'
import 'dayjs/locale/ru.js'
import { createRoot } from 'react-dom/client'

import '@/assets/styles/index.css'

dayjs.locale(AppConfig.Locale)
createRoot(document.getElementById('root')!).render(<App />)
