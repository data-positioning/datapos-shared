/**
 * Connector composables, constants, errors, types/interfaces and utilities.
 */
export type * from './types';
/** Constants  */
export declare const CONNECTOR_DESTINATION_OPERATIONS: string[];
export declare const CONNECTOR_SOURCE_OPERATIONS: string[];
export interface InitialiseSettings {
    properties: Record<string, unknown>;
}
/** Exposures */
export { connectorConfigSchema } from './connectorConfig.schema';
