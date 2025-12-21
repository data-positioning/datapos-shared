/**
 * Connector schema (drafted by Copilot).
 */

/** Dependencies - Vendor. */
import { array, boolean, literal, nullable, number, object, optional, record, string } from 'valibot';

/** Dependencies - Framework. */
import { literalUnion, localisedStringSchema, moduleConfigCoreFields } from '@/component/componentConfig.schema';

/** Schema Literal Unions - Connector authentication method identifier. */
const connectorAuthMethodIdSchema = literalUnion(['apiKey', 'disabled', 'oAuth2', 'none'] as const);

/** Schema Literal Unions - Connector category identifier. */
export const connectorCategoryIdSchema = literalUnion(['application', 'curatedDataset', 'database', 'fileStore'] as const);

/** Schema Literal Unions - Connector operation name. */
export const connectorOperationNameSchema = literalUnion([
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
    'retrieveChunks',
    'retrieveRecords',
    'upsertRecords'
] as const);

/** Schema Literal Unions - Connector usage identifier. */
export const connectorUsageIdSchema = literalUnion(['bidirectional', 'destination', 'source', 'unknown'] as const);

/** Schema Objects - Connector implementation. */
export const connectorImplementationSchema = object({
    authMethodId: connectorAuthMethodIdSchema,
    activeConnectionCount: optional(number()),
    canDescribe: optional(boolean()),
    id: optional(string()),
    label: optional(localisedStringSchema),
    maxConnectionCount: optional(number()),
    params: optional(array(record(string(), string())))
});

/** Schema Objects - Connector configuration. */
export const connectorConfigSchema = object({
    ...moduleConfigCoreFields,
    typeId: literal('connector'),
    category: nullable(object({ id: string(), label: string() })),
    categoryId: connectorCategoryIdSchema,
    implementations: record(string(), connectorImplementationSchema),
    operations: array(connectorOperationNameSchema),
    usageId: connectorUsageIdSchema,
    vendorAccountURL: nullable(string()),
    vendorDocumentationURL: nullable(string()),
    vendorHomeURL: nullable(string())
});
