import { useContext, useState } from 'react'
import { HttpContext } from './context'
import { MutationProp } from './types'

export const useMutation = (url: string, config?: MutationProp) => {
  const [error, setError] = useState(null)
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)

  const { instance, networkStatus } = useContext(HttpContext)

  const handle = (datas?:any) => {
    return new Promise((resolve, reject) => {
      setLoading(true)

      const conf = {...config, data: datas || config?.variables}

      instance
        .request({
          url,
          method: 'POST',
          ...conf
        })
        .then(({ data }) => {
          if (config?.onCompleted !== undefined) {
            config?.onCompleted(data)
          }
          resolve(data)
          setData(data)
        })
        .catch((error) => {
          reject(error)
          if (config?.onError !== undefined) {
            config?.onError(error)
          }
          setError(error)
        })
        .finally(() => {
          setLoading(false)
        })
    })
  }

  return [handle, { data, error, loading, networkStatus }] as const
}
