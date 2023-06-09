import React, { createContext, useCallback, useEffect, useState } from 'react'
import { Props } from './types'
import axios, { AxiosInstance } from 'axios'

const defaultValue = {
  instance: {} as AxiosInstance,
  networkStatus: '',
}

export const HttpContext = createContext(defaultValue)

const HttpProvider = ({ children, config, interceptors }: Props) => {
  const [isOnline, setIsOnline] = useState(false)
  const [instance, setInstance] = useState(() => defaultValue.instance)

  const initialize = useCallback(() => {
    const axiosInstance = axios.create(config)

    axiosInstance.interceptors.request.use(
      function (reqConfig) {
        if (interceptors?.request) interceptors.request.onSuccess(reqConfig)
        return reqConfig
      },

      function (error) {
        if (interceptors?.request) interceptors.request.onError(error)
        return error
      },
    )

    axiosInstance.interceptors.response.use(
      function (response) {
        if (interceptors?.response) interceptors.response.onSuccess(response)
        return response
      },

      function (error) {
        if (interceptors?.response) interceptors.response.onError(error)
        return error
      },
    )

    setInstance(() => axiosInstance)
  }, [config, interceptors?.request, interceptors?.response])

  const onlineHandler = () => {
    setIsOnline(true)
  }

  const offlineHandler = () => {
    setIsOnline(false)
  }

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    window.addEventListener('online', onlineHandler)
    window.addEventListener('offline', offlineHandler)

    return () => {
      window.removeEventListener('online', onlineHandler)
      window.removeEventListener('offline', offlineHandler)
    }
  }, [])

  return (
    <HttpContext.Provider value={{ instance, networkStatus: isOnline ? 'online' : 'offline' }}>
      {children}
    </HttpContext.Provider>
  )
}

export default HttpProvider
