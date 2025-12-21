/**
 * Connector schema (drafted by Copilot).
 */

/** Dependencies - Vendor. */
import { array, boolean, literal, nullable, number, object, optional, record, string } from 'valibot';

/** Dependencies - Framework. */
import { literalUnion, localisedStringSchema, moduleConfigCoreFields } from '@/component/componentConfig.schema';

/** Schemas -  */
export const connectorModuleCategoryIdSchema = literalUnion(['application', 'curatedDataset', 'database', 'fileStore'] as const);

/** Schemas - Connector operations. */
export const connectorOperationSchema = literalUnion([
    'abortOperation',
    'authenticateConnection',
    'createObject',
    'describeConnection',
    'dropObject',
    'findObject',
    'getReadableStream',
    'getRecord',
    'listNodes',
    'previewObject',
    'removeRecords',
    'retrieveRecords',
    'upsertRecords'
] as const);
export const connectorUsageIdSchema = literalUnion(['bidirectional', 'destination', 'source', 'unknown'] as const);
const connectorAuthMethodIdSchema = literalUnion(['apiKey', 'disabled', 'oAuth2', 'none'] as const);

/** Schemas - Connector category. */
const connectorCategorySchema = object({
    id: string(),
    label: string()
});

/** Schemas - Connector implementation. */
export const connectorImplementationSchema = object({
    authMethodId: connectorAuthMethodIdSchema,
    activeConnectionCount: optional(number()),
    canDescribe: optional(boolean()),
    id: optional(string()),
    label: optional(localisedStringSchema),
    maxConnectionCount: optional(number()),
    params: optional(array(record(string(), string())))
});

/** Schemas - Connector configuration. */
export const connectorConfigSchema = object({
    ...moduleConfigCoreFields,
    typeId: literal('connector'),
    category: nullable(connectorCategorySchema),
    categoryId: connectorModuleCategoryIdSchema,
    implementations: record(string(), connectorImplementationSchema),
    operations: array(connectorOperationSchema),
    usageId: connectorUsageIdSchema,
    vendorAccountURL: nullable(string()),
    vendorDocumentationURL: nullable(string()),
    vendorHomeURL: nullable(string())
});
