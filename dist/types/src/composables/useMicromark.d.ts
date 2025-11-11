import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';
import { math, mathHtml } from 'micromark-extension-math';
export declare function useMicromark(): {
    getStuff: () => Promise<{
        gfmExtension: typeof gfm;
        gfmHtmlExtension: typeof gfmHtml;
        mathExtension: typeof math;
        mathHtmlExtension: typeof mathHtml;
        micromark: typeof micromark;
    }>;
    render: () => Promise<void>;
};
