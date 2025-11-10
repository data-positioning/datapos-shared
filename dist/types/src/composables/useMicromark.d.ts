import { micromark } from 'micromark';
import { default as Prism } from 'prismjs';
export declare function useMicromark(): {
    getStuff: () => Promise<{
        micromark: typeof micromark;
        prism: typeof Prism;
    }>;
    render: () => Promise<void>;
};
