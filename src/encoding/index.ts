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
    groupLabel: string;
    label: string;
    isDetectable: boolean;
    isDecodable: boolean;
}

/**
 * Get encoding configurations.
 */
function getEncodingConfigs(localeId = 'en'): EncodingConfig[] {
    const encodingConfigs: EncodingConfig[] = [];
    const encodingConfigMap = encodingConfigData as Record<string, EncodingConfig | undefined>;
    for (const [, encodingConfig] of Object.entries(encodingConfigMap)) {
        if (encodingConfig == null) continue;
        encodingConfigs.push({ ...encodingConfig, label: encodingConfig.label || encodingConfig.id });
    }
    return encodingConfigs.toSorted((left, right) => left.groupLabel.localeCompare(right.groupLabel) || left.label.localeCompare(right.label));
}

// Exports.
export { default as encodingConfigData } from './encodingConfigs.json';
export { type EncodingConfig, getEncodingConfigs };
