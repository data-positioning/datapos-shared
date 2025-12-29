/**
 * Encoding.
 */

// Data dependencies.
import encodingConfigData from './encodingConfigs.json';

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

// Initialisation.
const encodingConfigMap = encodingConfigData as Record<string, EncodingTypeConfig>;

/**
 * Get encoding configurations.
 */
function getEncodingConfigs(localeId = 'en'): EncodingTypeConfig[] {
    const encodingConfigs: EncodingTypeConfig[] = [];
    for (const [, encodingConfig] of Object.entries(encodingConfigMap)) {
        encodingConfigs.push({ ...encodingConfig, label: encodingConfig.label || encodingConfig.id });
    }
    return encodingConfigs.toSorted((left, right) => left.groupLabel.localeCompare(right.groupLabel) || left.label.localeCompare(right.label));
}

// Exports.
export { type EncodingConfig, encodingConfigMap, type EncodingTypeConfig, getEncodingConfigs };
