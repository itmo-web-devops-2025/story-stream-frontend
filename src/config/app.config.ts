export const AppConfig = {
  DateFormat: 'DD MMMM, YYYY',
  Locale: 'ru',
  UrlServer: import.meta.env.VITE_API_URL || 'https://api.music-demo.ru'
} as const
