import { ACCESS_TOKEN } from '@/constants/core/local-storage-keys.constant'
import { getApiBaseUrl } from '@/utils/get-api-base-url.util'
import { getFromLocalStorage } from '@/utils/local-storage.utl'
import axios from 'axios'

export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use((config) => {
  const token = getFromLocalStorage<string>(ACCESS_TOKEN)

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
