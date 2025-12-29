/**
 * Encoding.
 */

// Data dependencies.
import encodingConfigData from './encodingConfigs.json';

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
function getEncodingConfigs(localeId = 'en'): EncodingTypeConfig[] {
    const encodingConfigs: EncodingTypeConfig[] = [];
    const encodingConfigMap = encodingConfigData as Record<string, EncodingTypeConfig | undefined>;
    for (const [, encodingConfig] of Object.entries(encodingConfigMap)) {
        if (encodingConfig == null) continue;
        encodingConfigs.push({ ...encodingConfig, label: encodingConfig.label || encodingConfig.id });
    }
    return encodingConfigs.toSorted((left, right) => left.groupLabel.localeCompare(right.groupLabel) || left.label.localeCompare(right.label));
}

// Exports.
export { default as encodingConfigData } from './encodingConfigs.json';
export { type Encoding, type EncodingTypeConfig, getEncodingConfigs };
