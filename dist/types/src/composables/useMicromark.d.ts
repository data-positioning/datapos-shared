import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';
export declare function useMicromark(): {
    getStuff: () => Promise<{
        gfmHtmlExtension: typeof gfmHtml;
        gfmExtension: typeof gfm;
        micromark: typeof micromark;
    }>;
    render: () => Promise<void>;
};
