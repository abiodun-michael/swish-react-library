import { MutationProp } from './types';
export declare const useQuery: (url: string, config: MutationProp) => {
    readonly data: {};
    readonly error: null;
    readonly loading: boolean;
    readonly refetch: () => void;
    readonly networkStatus: string;
};
