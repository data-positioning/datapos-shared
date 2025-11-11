import { gfm } from 'micromark-extension-gfm';
import { micromark } from 'micromark';
export declare function useMicromark(): {
    getStuff: () => Promise<{
        gfmExtension: typeof gfm;
        micromark: typeof micromark;
    }>;
    render: () => Promise<void>;
};
