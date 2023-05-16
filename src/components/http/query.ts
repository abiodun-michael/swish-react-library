import { useCallback, useContext, useEffect, useState } from 'react'
import { HttpContext } from './context'
import { MutationProp } from './types'

export const useQuery = (url: string, config: MutationProp) => {
  const [error, setError] = useState(null)
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)

  const { instance, networkStatus } = useContext(HttpContext)

  const handle = useCallback(() => {
    setLoading(true)

    instance
      .request({
        url,
        method: 'GET',
        ...config,
      })
      .then((response) => {
        setData(response?.data)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [config, instance, url])

  useEffect(() => {
    handle()
  }, [handle])

  return { data, error, loading, refetch: handle, networkStatus } as const
}
