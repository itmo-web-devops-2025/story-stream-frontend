/**
 * Сохраняет данные в localStorage
 * @param key Ключ, по которому будет сохранена информация
 * @param value Значение, которое нужно сохранить (строка, объект, массив и т. д.)
 */
export const saveToLocalStorage = (key: string, value: unknown): void => {
  try {
    if (typeof value === 'object') {
      JSON.stringify(value)
    }

    if (value === undefined) {
      throw new Error("Value doesn't must be undefined")
    }

    localStorage.setItem(key, String(value))
  } catch (error) {
    console.error('Ошибка при сохранении в localStorage:', error)
  }
}

/**
 * Получает данные из localStorage
 * @param key Ключ, по которому хранятся данные
 * @returns Данные, сохраненные по ключу (если данных нет, возвращается null)
 */
export const getFromLocalStorage = <T>(key: string): T | null => {
  try {
    const value = localStorage.getItem(key)
    if (value) {
      try {
        return JSON.parse(value)
      } catch {
        return value as unknown as T
      }
    }
    return null
  } catch (error) {
    console.error('Ошибка при получении из localStorage:', error)
    return null
  }
}

/**
 * Удаляет данные из localStorage по ключу
 * @param key Ключ, по которому нужно удалить данные
 */
export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Ошибка при удалении из localStorage:', error)
  }
}

/**
 * Очищает весь localStorage
 */
export const clearLocalStorage = (): void => {
  try {
    localStorage.clear()
  } catch (error) {
    console.error('Ошибка при очистке localStorage:', error)
  }
}
