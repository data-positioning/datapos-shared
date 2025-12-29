/**
 * Encoding.
 */
/**
 * Encoding configuration.
 */
interface EncodingConfig {
    id: string;
    groupLabel: string;
    label: string;
    isDetectable: boolean;
    isDecodable: boolean;
}
/**
 * Get encoding configurations.
 */
declare function getEncodingConfigs(localeId?: string): EncodingConfig[];
export { default as encodingConfigData } from './encodingConfigs.json';
export { type EncodingConfig, getEncodingConfigs };
