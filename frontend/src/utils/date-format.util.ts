import { AppConfig } from '@/config/app.config'
import dayjs from 'dayjs'

export const dateFormat = (date: Date): string =>
  dayjs(date).format(AppConfig.DateFormat)
