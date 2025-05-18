import {
  clearLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage
} from '@/utils/local-storage.util'
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest'

const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

describe('localStorage utilities', () => {
  let originalLocalStorage: Storage

  beforeEach(() => {
    // Preserve real localStorage
    originalLocalStorage = globalThis.localStorage
    // Replace with mock storage
    let store: Record<string, string> = {}
    const mockStorage: Storage = {
      getItem: vi.fn((key: string) => (key in store ? store[key] : null)),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key]
      }),
      clear: vi.fn(() => {
        store = {}
      }),
      key: vi.fn(),
      length: 0
    }
    Object.defineProperty(mockStorage, 'length', {
      get: () => Object.keys(store).length
    })
    globalThis.localStorage = mockStorage
    vi.clearAllMocks()
  })

  afterEach(() => {
    // Restore real localStorage and console.error
    globalThis.localStorage = originalLocalStorage
  })

  describe('saveToLocalStorage', () => {
    it('should store string values correctly', () => {
      saveToLocalStorage('key1', 'value1')
      expect(localStorage.setItem).toHaveBeenCalledWith('key1', 'value1')
      expect(consoleErrorSpy).not.toHaveBeenCalled()
    })

    it('should stringify objects then store as string', () => {
      const obj = { a: 1 }
      const jsonSpy = vi.spyOn(JSON, 'stringify')
      saveToLocalStorage('key2', obj)
      expect(jsonSpy).toHaveBeenCalledWith(obj)
      expect(localStorage.setItem).toHaveBeenCalledWith('key2', String(obj))
    })

    it('should throw and catch error when value is undefined', () => {
      saveToLocalStorage('key3', undefined)
      expect(localStorage.setItem).not.toHaveBeenCalled()
      expect(consoleErrorSpy).toHaveBeenCalled()
    })
  })

  describe('getFromLocalStorage', () => {
    it('should return null if nothing stored', () => {
      ;(localStorage.getItem as Mock).mockReturnValue(null)
      expect(getFromLocalStorage('missing')).toBeNull()
    })

    it('should parse JSON strings', () => {
      const data = { b: 2 }
      const json = JSON.stringify(data)
      ;(localStorage.getItem as Mock).mockReturnValue(json)
      expect(getFromLocalStorage('jsonKey')).toEqual(data)
    })

    it('should return raw string if JSON.parse fails', () => {
      const raw = 'not a json'
      ;(localStorage.getItem as Mock).mockReturnValue(raw)
      expect(getFromLocalStorage('rawKey')).toBe(raw)
    })

    it('should catch and log errors on getItem exception', () => {
      ;(localStorage.getItem as Mock).mockImplementation(() => {
        throw new Error('fail')
      })
      expect(getFromLocalStorage('errorKey')).toBeNull()
      expect(consoleErrorSpy).toHaveBeenCalled()
    })
  })

  describe('removeFromLocalStorage', () => {
    it('should remove item without error', () => {
      removeFromLocalStorage('key1')
      expect(localStorage.removeItem).toHaveBeenCalledWith('key1')
      expect(consoleErrorSpy).not.toHaveBeenCalled()
    })

    it('should catch and log errors on removeItem exception', () => {
      ;(localStorage.removeItem as Mock).mockImplementation(() => {
        throw new Error('remove fail')
      })
      removeFromLocalStorage('key2')
      expect(consoleErrorSpy).toHaveBeenCalled()
    })
  })

  describe('clearLocalStorage', () => {
    it('should clear storage without error', () => {
      clearLocalStorage()
      expect(localStorage.clear).toHaveBeenCalled()
      expect(consoleErrorSpy).not.toHaveBeenCalled()
    })

    it('should catch and log errors on clear exception', () => {
      ;(localStorage.clear as Mock).mockImplementation(() => {
        throw new Error('clear fail')
      })
      clearLocalStorage()
      expect(consoleErrorSpy).toHaveBeenCalled()
    })
  })
})
