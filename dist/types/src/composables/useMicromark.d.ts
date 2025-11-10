import { micromark } from 'micromark';
import { default as prism } from 'prismjs';
export declare function useMicromark(): {
    getStuff: () => Promise<{
        micromark: typeof micromark;
        prism: typeof prism;
    }>;
    render: () => Promise<void>;
};
