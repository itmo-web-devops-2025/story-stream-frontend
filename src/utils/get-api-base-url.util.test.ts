import { AppConfig } from '@/config/app.config'
import { getApiBaseUrl } from '@/utils/get-api-base-url.util'
import {
  getFromLocalStorage,
  saveToLocalStorage
} from '@/utils/local-storage.util'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Correctly mock AppConfig and local storage utilities
vi.mock('@/config/app.config', () => ({
  AppConfig: { UrlServer: 'https://api.example.com' }
}))
vi.mock('@/utils/local-storage.util', () => ({
  getFromLocalStorage: vi.fn(),
  saveToLocalStorage: vi.fn()
}))

// Typed mocks for local storage functions
const mockedGetFromLocalStorage = vi.mocked(getFromLocalStorage)
const mockedSaveToLocalStorage = vi.mocked(saveToLocalStorage)
const API_URL_KEY = 'API_URL'

describe('getApiBaseUrl', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return the URL from local storage if available', () => {
    mockedGetFromLocalStorage.mockReturnValue('http://localhost:3000')

    const result = getApiBaseUrl()

    expect(mockedGetFromLocalStorage).toHaveBeenCalledWith(API_URL_KEY)
    expect(result).toBe('http://localhost:3000')
    expect(mockedSaveToLocalStorage).not.toHaveBeenCalled()
  })

  it('should save and return AppConfig.UrlServer when local storage is empty', () => {
    mockedGetFromLocalStorage.mockReturnValue(undefined)

    const result = getApiBaseUrl()

    expect(mockedGetFromLocalStorage).toHaveBeenCalledWith(API_URL_KEY)
    expect(mockedSaveToLocalStorage).toHaveBeenCalledWith(
      API_URL_KEY,
      AppConfig.UrlServer
    )
    expect(result).toBe(AppConfig.UrlServer)
  })

  it('should treat an empty string from local storage as absent and override', () => {
    mockedGetFromLocalStorage.mockReturnValue('')

    const result = getApiBaseUrl()

    expect(mockedGetFromLocalStorage).toHaveBeenCalledWith(API_URL_KEY)
    expect(mockedSaveToLocalStorage).toHaveBeenCalledWith(
      API_URL_KEY,
      AppConfig.UrlServer
    )
    expect(result).toBe(AppConfig.UrlServer)
  })

  it('should not call saveToLocalStorage again if AppConfig.UrlServer is already in storage', () => {
    mockedGetFromLocalStorage.mockReturnValue(AppConfig.UrlServer)

    const result = getApiBaseUrl()

    expect(mockedGetFromLocalStorage).toHaveBeenCalledWith(API_URL_KEY)
    expect(mockedSaveToLocalStorage).not.toHaveBeenCalled()
    expect(result).toBe(AppConfig.UrlServer)
  })
})
