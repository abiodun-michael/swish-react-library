import { MutationProp } from './types';
export declare const useMutation: (url: string, config?: MutationProp) => readonly [(datas?: any) => Promise<unknown>, {
    readonly data: {};
    readonly error: null;
    readonly loading: boolean;
    readonly networkStatus: string;
}];
