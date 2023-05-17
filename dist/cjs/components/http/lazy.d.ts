import { MutationProp } from './types';
export declare const useLazyQuery: (url: string, config?: MutationProp) => readonly [(variables?: unknown) => Promise<unknown>, {
    readonly data: {};
    readonly error: null;
    readonly loading: boolean;
    readonly refetch: (variables?: unknown) => Promise<unknown>;
    readonly networkStatus: string;
}];
