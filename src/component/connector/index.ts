/**
 * Connector composables, constants, errors, types/interfaces and utilities.
 */

/** Dependencies - Framework. */
import { DEFAULT_LOCALE_CODE } from '@/locales';
import type { LocalisedString } from '@/locales';

export type * from '@/component/connector/types';

/** Constants  */
export const CONNECTOR_DESTINATION_OPERATIONS = ['createObject', 'dropObject', 'removeRecords', 'upsertRecords'];
export const CONNECTOR_SOURCE_OPERATIONS = ['findObject', 'getRecord', 'listNodes', 'previewObject', 'retrieveRecords'];

// Types/Interfaces/Operations - Initialise settings.
export interface InitialiseSettings {
    properties: Record<string, unknown>;
}

// Types/Interfaces/Operations - Connector category.
interface ConnectorCategory {
    id: string;
    label: string;
}
type LocaleLabelMap = ReadonlyMap<string, string>;
const createLocaleLabelMap = (labels: Partial<LocalisedString>): LocaleLabelMap => {
    const entries = Object.entries(labels).filter((entry): entry is [string, string] => typeof entry[1] === 'string');
    return new Map(entries);
};
const resolveLocaleLabel = (labels: LocaleLabelMap, localeId: string, fallbackLocaleId = DEFAULT_LOCALE_CODE): string | undefined => {
    const localizedLabel = labels.get(localeId);
    if (localizedLabel !== undefined) return localizedLabel;
    if (fallbackLocaleId === localeId) return undefined;
    return labels.get(fallbackLocaleId);
};
interface ConnectorCategoryConfig {
    id: string;
    labels: LocaleLabelMap;
}
const connectorCategories: ConnectorCategoryConfig[] = [
    { id: 'application', labels: createLocaleLabelMap({ 'en-gb': 'Application' }) },
    { id: 'curatedDataset', labels: createLocaleLabelMap({ 'en-gb': 'Curated Dataset' }) },
    { id: 'database', labels: createLocaleLabelMap({ 'en-gb': 'Database' }) },
    { id: 'fileStore', labels: createLocaleLabelMap({ 'en-gb': 'File Store' }) }
];
const getConnectorCategory = (id: string, localeId = DEFAULT_LOCALE_CODE): ConnectorCategory => {
    const connectorCategory = connectorCategories.find((connectorCategory) => connectorCategory.id === id);
    if (connectorCategory) {
        const resolvedLabel = resolveLocaleLabel(connectorCategory.labels, localeId);
        return { id: connectorCategory.id, label: resolvedLabel ?? connectorCategory.id };
    }
    return { id, label: id };
};

/** Exposures */
export { connectorConfigSchema } from '@/component/connector/connectorConfig.schema';
