/**
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 * @file datapos-engine/src/connection.ts
 * @license ISC
 */

// ...
import type { FirebaseTimestamp } from '.';
import { type ComponentItem, ComponentTypeId, type Component } from './component';
import type { ConnectionEntry } from './connectionEntry';
import { ConnectorAuthMethodId, type ConnectorImplementation, type ConnectorItem } from './connector';
import { establishDataConnector } from './dataConnector';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connection
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

interface Connection extends Component {}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connection - Config
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connection - Item
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface ConnectionItem extends ComponentItem {
    authorization?: Record<string, ConnectionItemAuthorization>;
    connectorItem: ConnectorItem;
    implementation: ConnectorImplementation;
    implementationId?: string;
    notation?: string;
    verifiedAt?: FirebaseTimestamp;
}

interface ConnectionItemAuthorization {
    access_token: string; // Dropbox.
    account_id: string; // Dropbox.
    expires_at: number; // Dropbox.
    expires_in: number; // Dropbox.
    refresh_token: string; // Dropbox.
    scope: string; // Dropbox.
    token_type: string; // Dropbox.
    uid: string; // Dropbox.
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connection - Load Items
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const loadConnectionItems = (connectorItems: ConnectorItem[], accountConnectionItems: Record<string, ConnectionItem>): ConnectionItem[] => {
    const connectionItems: ConnectionItem[] = [];
    for (const connectorItem of connectorItems) {
        for (const implementation of connectorItem.implementations) {
            if (implementation.authMethodId === ConnectorAuthMethodId.None) connectionItems.push(buildFileStoreEmulatorConnection(connectorItem));
            break;
        }
    }
    for (const accountConnectionItem of Object.entries(accountConnectionItems)) {
        // const connectionItem: ConnectionItem = {};
        // connectionItems.push(connectionItem);
    }
    return connectionItems;
};

const buildFileStoreEmulatorConnection = (connectorItem: ConnectorItem): ConnectionItem => ({
    authorization: undefined,
    connectorItem: connectorItem,
    firstCreatedAt: { nanoseconds: 0, seconds: 0 },
    id: connectorItem.id,
    implementation: connectorItem.implementations[0],
    implementationId: undefined,
    lastUpdatedAt: { nanoseconds: 0, seconds: 0 },
    notation: undefined,
    summary: undefined,
    typeId: ComponentTypeId.Connection,
    verifiedAt: { nanoseconds: 0, seconds: 0 }
});

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Connection - Retrieve Entries
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface ConnectionEntriesPage {
    cursor: string | number | undefined;
    entries: ConnectionEntry[];
    isMore: boolean;
    totalCount: number;
}

export interface ConnectionEntriesRetrievalProperties {
    limit: number;
    offset: number;
    totalCount?: number;
}

export const retrieveEntries = async (connectionItem: ConnectionItem, folderPath: string, properties?: ConnectionEntriesRetrievalProperties) => {
    try {
        const dataConnector = await establishDataConnector(connectionItem);
        if (!dataConnector.retrieveEntries) throw new Error(`Data connector (${dataConnector.id}) does not implement a 'retrieveEntries' method.`);
        const response = await dataConnector.retrieveEntries(undefined, undefined, { folderPath }, { limit: 100, offset: 0, totalCount: undefined });
        return { result: response };
    } catch (error) {
        return { error: error };
    }
};
