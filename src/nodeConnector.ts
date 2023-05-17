/**
 * @file datapos-engine-support/src/nodeConnector.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// Engine Dependencies
// import type { ComponentItem } from '.';
import type { Connector } from './connector';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Node Connector
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface NodeConnector extends Connector {
    // Node Item(s) - Delete List & Upsert
    deleteNodeItem(nodeItemTypeId: NodeItemTypeId, id: string): Promise<void>;
    // getNodeItem(nodeItemTypeId: NodeItemTypeId, id: string): Promise<NodeItem>;
    // listNodeItems(nodeItemTypeId?: NodeItemTypeId): Promise<NodeItem[]>;
    // upsertNodeItem(nodeItemTypeId: NodeItemTypeId, nodeItem: NodeItem | Partial<NodeItem>, id?: string): Promise<NodeItem>;

    // Node Item Properties - Get & Upsert
    getNodeItemProperties(nodeItemTypeId: NodeItemTypeId, id: string): Promise<NodeItemProperties>;
    upsertNodeItemProperties(nodeItemTypeId: NodeItemTypeId, properties: NodeItemProperties, id?: string | Partial<NodeItemProperties>): Promise<NodeItemProperties>;

    // Node Item Data - Clear, Count, Determine, Insert & Retrieve
    clearNodeItemData(nodeItemTypeId: NodeItemTypeId, collection: unknown): Promise<void>;
    countNodeItemData(nodeItemTypeId: NodeItemTypeId, collection: unknown): Promise<number>;
    determineNodeItemData(nodeItemTypeId: NodeItemTypeId, id: string, nodeDataTypeId: NodeDataTypeId, isToBeCleared: boolean): Promise<unknown>;
    insertNodeItemData(nodeItemTypeId: NodeItemTypeId, collection: unknown, data: Record<string, unknown>[]): Promise<void>;
    retrieveNodeItemData(
        nodeItemTypeId: NodeItemTypeId,
        collection: unknown,
        lineCount?: number,
        startRow?: number,
        query?: NodeQuery,
        before?: number,
        after?: number
    ): Promise<NodeDataPageResults>;
}

export interface NodeConnectorConstructor {
    new (): NodeConnector;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Node Connector -
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// export type NodeItem = ComponentItem;

export type NodeItemProperties = Record<string, unknown>;

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Node Connector -
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface NodeQuery {
    select: NodeQueryColumns;
}

interface NodeQueryColumns {
    columns: NodeQueryColumn[];
}

interface NodeQueryColumn {
    expression: NodeQueryExpression;
}

export interface NodeQueryExpression {
    expressions: NodeQueryExpression[];
    type: string;
}

export interface NodeQueryExpressionValue {
    dataItemName: string;
    type: string;
    value: boolean | number | string | null | unknown;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Node Connector -
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface NodeDataPageResults {
    after?: number;
    before?: number;
    data: Record<string, unknown>[];
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Node Connector - Enumerations
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export enum NodeDataTypeId {
    Data = 'data',
    Events = 'events',
    Facts = 'facts'
}

export enum NodeItemTypeId {
    Dimension = 'dimension',
    Entity = 'entity',
    EventQuery = 'eventQuery',
    SourceView = 'sourceView',
    Workbook = 'workbook'
}
