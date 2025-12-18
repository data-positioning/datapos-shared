import { literal, nullable, number, object, optional, string, union } from 'valibot';

export const literalUnion = <const T extends readonly string[]>(values: T) => union(values.map((value) => literal(value)));

export const localisedStringSchema = object({
    'en-au': string(),
    'en-gb': string(),
    'en-us': string(),
    'es-es': string()
});

export const partialLocalisedStringSchema = object({
    'en-au': optional(string()),
    'en-gb': optional(string()),
    'en-us': optional(string()),
    'es-es': optional(string())
});

export const statusColorIdSchema = literalUnion(['amber', 'green', 'red', 'other'] as const);
export const componentStatusIdSchema = literalUnion([
    'alpha',
    'beta',
    'generalAvailability',
    'notApplicable',
    'preAlpha',
    'proposed',
    'releaseCandidate',
    'unavailable',
    'underReview'
] as const);
export const componentTypeIdSchema = literalUnion([
    'app',
    'connector',
    'connectorConnection',
    'context',
    'contextModelGroup',
    'contextModel',
    'contextModelDimensionGroup',
    'contextModelDimension',
    'contextModelDimensionHierarchy',
    'contextModelEntityGroup',
    'contextModelEntity',
    'contextModelEntityDataItem',
    'contextModelEntityEvent',
    'contextModelEntityPrimaryMeasure',
    'contextModelSecondaryMeasureGroup',
    'contextModelSecondaryMeasure',
    'dataView',
    'dimension',
    'engine',
    'eventQuery',
    'presenter',
    'presenterPresentation',
    'tool'
] as const);
export const moduleTypeIdSchema = literalUnion(['app', 'engine', 'connector', 'context', 'presenter', 'tool'] as const);

export const componentStatusSchema = object({
    id: string(),
    color: statusColorIdSchema,
    label: string()
});

export const componentConfigCoreFields = {
    id: string(),
    label: partialLocalisedStringSchema,
    description: partialLocalisedStringSchema,
    firstCreatedAt: optional(number()),
    icon: nullable(string()),
    iconDark: nullable(string()),
    lastUpdatedAt: nullable(number()),
    status: nullable(componentStatusSchema),
    statusId: componentStatusIdSchema
} as const;

export const componentConfigSchema = object({
    ...componentConfigCoreFields,
    typeId: componentTypeIdSchema
});

export const moduleConfigCoreFields = {
    ...componentConfigCoreFields,
    version: string()
} as const;

export const moduleConfigSchema = object({
    ...moduleConfigCoreFields,
    typeId: moduleTypeIdSchema
});

export const componentRefSchema = object({
    id: string(),
    label: partialLocalisedStringSchema,
    description: partialLocalisedStringSchema,
    icon: optional(string()),
    iconDark: optional(string()),
    order: number(),
    path: string()
});
