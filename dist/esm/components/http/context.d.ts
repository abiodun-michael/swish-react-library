import React from 'react';
import { Props } from './types';
import { AxiosInstance } from 'axios';
export declare const HttpContext: React.Context<{
    instance: AxiosInstance;
    networkStatus: string;
}>;
declare const HttpProvider: ({ children, config, interceptors }: Props) => React.JSX.Element;
export default HttpProvider;
