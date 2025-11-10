import { micromark } from 'micromark';
import { default as prism } from 'prismjs';
export declare function useMicromark(): {
    getStuff: () => {
        micromark: typeof micromark | undefined;
        prism: typeof prism | undefined;
    };
    render: () => Promise<void>;
};
