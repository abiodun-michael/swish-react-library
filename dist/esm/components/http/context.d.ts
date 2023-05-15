import React from 'react';
import { Prop } from './types';
import { AxiosInstance } from 'axios';
export declare const HttpContext: React.Context<{
    instance: AxiosInstance;
    networkStatus: string;
}>;
export declare const HttpProvider: ({ children, config, interceptors }: Prop) => React.JSX.Element;
