import { AppConfig } from '@/config/app.config'
import {
  getFromLocalStorage,
  saveToLocalStorage
} from '@/utils/local-storage.utl'

const API_URL_KEY = 'API_URL'

export function getApiBaseUrl(): string {
  const localStorageUrl = getFromLocalStorage<string>(API_URL_KEY)

  if (localStorageUrl) {
    return localStorageUrl
  }

  saveToLocalStorage(API_URL_KEY, AppConfig.UrlServer)
  return AppConfig.UrlServer
}
