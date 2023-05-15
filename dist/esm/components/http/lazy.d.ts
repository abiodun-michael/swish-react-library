import { MutationProp } from './types';
export declare const useLazyQuery: (url: string, config: MutationProp) => readonly [() => Promise<unknown>, {
    readonly data: {};
    readonly error: null;
    readonly loading: boolean;
    readonly refetch: () => Promise<unknown>;
    readonly networkStatus: string;
}];
