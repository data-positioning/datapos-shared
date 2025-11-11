import { micromark } from 'micromark';
export declare function useMicromark(): {
    getStuff: () => Promise<{
        micromark: typeof micromark;
    }>;
    render: () => Promise<void>;
};
