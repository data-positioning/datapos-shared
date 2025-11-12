import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';
import { math, mathHtml } from 'micromark-extension-math';
type MicromarkTools = {
    gfmExtension: typeof gfm;
    gfmHtmlExtension: typeof gfmHtml;
    mathExtension: typeof math;
    mathHtmlExtension: typeof mathHtml;
    micromark: typeof micromark;
};
export declare function useMicromark(): {
    getTools: () => Promise<MicromarkTools>;
    render: () => Promise<void>;
};
export {};
