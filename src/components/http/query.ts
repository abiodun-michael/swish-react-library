import { useContext, useEffect, useState } from 'react'
import { HttpContext } from './context'
import { MutationProp } from './types'

export const useQuery = (url: string, config: MutationProp) => {
  const [error, setError] = useState(null)
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)

  const { instance, networkStatus } = useContext(HttpContext)

  const handle = () => {
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
  }

  useEffect(() => {
    handle()
  }, [])

  return { data, error, loading, refetch: handle, networkStatus } as const
}
