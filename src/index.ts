/**
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 * @file datapos-engine-support/src/index.ts
 * @license ISC
 */

import type { DataConnector } from './dataConnector';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Declarations
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface CallbackProperties {
    error?: Error;
    index: number;
    value?: number;
}

export interface DPAFileSystemFileHandle {
    readonly kind: 'file';
    getFile(): Promise<File>;
}

export interface FirebaseTimestamp {
    nanoseconds: number;
    seconds: number;
}

export interface Progress {
    id: string;
    value: unknown;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export * from './component';

export * from './plugin';
export * from './connector';
export * from './dataConnector';
export * from './nodeConnector';

export * from './connection';
export * from './connectionEntry';

export * from './sourceView';

export * from './eventQuery';

export * from './reportTemplate';

export * from './usageKit';

export * from './errorData';
export * from './utilities';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Engine
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface Engine {
    dataConnectors: Record<string, DataConnector>;
    storageURLPrefix: string;
}

const engine: Engine = {
    dataConnectors: {},
    storageURLPrefix: ''
};

// export const initialise = (storageURLPrefix: string) => {
//     engine.storageURLPrefix = storageURLPrefix;

//     try {
//         // const contentAudit = ContentAudit.new();
//         // console.log('contentAudit', contentAudit);
//         // const ptr = contentAudit.get_utf8_in_buffer_pointer();
//         // const columnCount = contentAudit.get_column_count();
//         // console.log(1234, ptr, columnCount);
//     } catch (error) {
//         console.log(9999, error);
//     }
// };

export const useEngine = () => engine;
