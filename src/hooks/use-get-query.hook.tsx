import { useEffect, useState } from 'react'

const useGetQuery = <T,>(promiseFn: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown | null>(null)

  useEffect(() => {
    setIsLoading(true)
    promiseFn()
      .then((response) => {
        setData(response)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [promiseFn])

  return { data, isLoading, error }
}

export default useGetQuery
