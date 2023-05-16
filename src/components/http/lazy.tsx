import { useContext, useState } from 'react'
import { HttpContext } from './context'
import { MutationProp } from './types'

export const useLazyQuery = (url: string, config?: MutationProp) => {
  const [error, setError] = useState(null)
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)

  const { instance, networkStatus } = useContext(HttpContext)

  const handle = (variables?: unknown) => {
    return new Promise((resolve, reject) => {
      setLoading(true)

      instance
        .request({
          url,
          method: 'GET',
          ...config,
          data: variables || config?.variables
        })
        .then((response) => {
          setData(response?.data)
          if (config?.onCompleted !== undefined) {
            config?.onCompleted(data)
          }
          resolve(response?.data)
        })
        .catch((error) => {
          setError(error)
          if (config?.onError !== undefined) {
            config?.onError(error)
          }
          reject(error)
        })
        .finally(() => {
          setLoading(false)
        })
    })
  }

  return [handle, { data, error, loading, refetch: handle, networkStatus }] as const
}
