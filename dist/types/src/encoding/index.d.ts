/**
 * Encoding.
 */
/** Encoding. */
interface Encoding {
    id: string;
    confidenceLevel: number | undefined;
}
/**
 * Encoding type configuration.
 */
interface EncodingTypeConfig {
    id: string;
    groupLabel: string;
    label: string;
    isDetectable: boolean;
    isDecodable: boolean;
}
/**
 * Get encoding configurations.
 */
declare function getEncodingConfigs(localeId?: string): EncodingTypeConfig[];
export { default as encodingConfigData } from './encodingConfigs.json';
export { type Encoding, type EncodingTypeConfig, getEncodingConfigs };
