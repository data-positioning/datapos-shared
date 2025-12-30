/**
 * Encoding.
 */
/**
 * Encoding configuration.
 */
interface EncodingConfig {
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
declare const encodingConfigMap: Record<string, EncodingTypeConfig>;
/**
 * Get encoding type configurations.
 */
declare function getEncodingTypeConfigs(localeId?: string): EncodingTypeConfig[];
export { type EncodingConfig, encodingConfigMap, type EncodingTypeConfig, getEncodingTypeConfigs };
