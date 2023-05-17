import { AxiosRequestConfig } from 'axios'
import { ReactNode } from 'react'

export type Config = {
  baseURL: string
  timeout?: number
  headers?: object
}

export type Props = {
  children: ReactNode
  config?: Config
  interceptors?: InterceptorProp
}

export type MutationProp = AxiosRequestConfig & MutationConfig

export type MutationConfig = {
  onCompleted?: (payload: unknown) => void
  onError?: (error: unknown) => void
  variables?: object
}

type AxiosInterceptor = {
  onSuccess: (payload: unknown) => void
  onError: (error: unknown) => void
}

type InterceptorProp = {
  response?: AxiosInterceptor
  request?: AxiosInterceptor
}
