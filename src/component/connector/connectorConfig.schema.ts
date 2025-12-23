/**
 * Connector configuration schema.
 *
 * Defines the configuration metadata for a connector. Used for validation
 * of connector manifests and capability discovery at runtime.
 */

/** Vendor dependencies */
import { array, boolean, literal, nullable, number, object, optional, record, string } from 'valibot';

/** Framework dependencies. */
import { literalUnion, localisedStringSchema, moduleConfigCoreFields } from '@/component/componentConfig.schema';

/** Authentication method identifiers supported by a connector implementation. */
export const connectorAuthMethodIdSchema = literalUnion(['apiKey', 'disabled', 'oAuth2', 'none'] as const);

/** A connector implementation variant. A single connector may expose multiple
 * implementations differing by auth method, limits, or vendor-specific behavior.
 */
export const connectorImplementationSchema = object({
    authMethodId: connectorAuthMethodIdSchema,
    activeConnectionCount: optional(number()),
    canDescribe: optional(boolean()),
    id: optional(string()),
    label: optional(localisedStringSchema),
    maxConnectionCount: optional(number()),
    params: optional(array(record(string(), string())))
});

/** Category identifiers used for grouping and filtering connectors. */
export const connectorCategoryIdSchema = literalUnion(['application', 'curatedDataset', 'database', 'fileStore'] as const);

/** Operation names a connector may support. */
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

/** Connector data pipeline usage identifiers. */
export const connectorUsageIdSchema = literalUnion(['bidirectional', 'destination', 'source', 'unknown'] as const);

/** Top-level connector configuration object. */
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
