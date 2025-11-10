import { micromark } from 'micromark';
import { default as prism } from 'prismjs';
export declare function useMicromark(): {
    getStuff: () => {
        micromarkModule: typeof micromark | undefined;
        prismModule: typeof prism | undefined;
    };
    render: () => Promise<void>;
};
