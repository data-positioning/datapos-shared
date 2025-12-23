import { LiteralSchema, UnionSchema } from 'valibot';
type LiteralUnionSchema<T extends readonly string[]> = UnionSchema<{
    [K in keyof T]: LiteralSchema<T[K], undefined>;
}, undefined>;
export declare const literalUnion: <const T extends readonly string[]>(values: T) => LiteralUnionSchema<T>;
export declare const localisedStringSchema: import('valibot').ObjectSchema<{
    readonly 'en-au': import('valibot').StringSchema<undefined>;
    readonly 'en-gb': import('valibot').StringSchema<undefined>;
    readonly 'en-us': import('valibot').StringSchema<undefined>;
    readonly 'es-es': import('valibot').StringSchema<undefined>;
}, undefined>;
export declare const partialLocalisedStringSchema: import('valibot').ObjectSchema<{
    readonly 'en-au': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly 'en-gb': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly 'en-us': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly 'es-es': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
}, undefined>;
export declare const componentStatusColorIdSchema: LiteralUnionSchema<readonly ["amber", "green", "red", "other"]>;
export declare const componentStatusIdSchema: LiteralUnionSchema<readonly ["alpha", "beta", "generalAvailability", "notApplicable", "preAlpha", "proposed", "releaseCandidate", "unavailable", "underReview"]>;
export declare const componentTypeIdSchema: LiteralUnionSchema<readonly ["app", "connector", "connectorConnection", "context", "contextModelGroup", "contextModel", "contextModelDimensionGroup", "contextModelDimension", "contextModelDimensionHierarchy", "contextModelEntityGroup", "contextModelEntity", "contextModelEntityDataItem", "contextModelEntityEvent", "contextModelEntityPrimaryMeasure", "contextModelSecondaryMeasureGroup", "contextModelSecondaryMeasure", "dataView", "dimension", "engine", "eventQuery", "presenter", "presenterPresentation", "tool"]>;
export declare const componentStatusSchema: import('valibot').ObjectSchema<{
    readonly id: import('valibot').StringSchema<undefined>;
    readonly color: LiteralUnionSchema<readonly ["amber", "green", "red", "other"]>;
    readonly label: import('valibot').StringSchema<undefined>;
}, undefined>;
export declare const componentConfigCoreFields: {
    readonly id: import('valibot').StringSchema<undefined>;
    readonly label: import('valibot').ObjectSchema<{
        readonly 'en-au': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly 'en-gb': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly 'en-us': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly 'es-es': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
    }, undefined>;
    readonly description: import('valibot').ObjectSchema<{
        readonly 'en-au': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly 'en-gb': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly 'en-us': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly 'es-es': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
    }, undefined>;
    readonly firstCreatedAt: import('valibot').OptionalSchema<import('valibot').NumberSchema<undefined>, undefined>;
    readonly icon: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly iconDark: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly lastUpdatedAt: import('valibot').NullableSchema<import('valibot').NumberSchema<undefined>, undefined>;
    readonly status: import('valibot').NullableSchema<import('valibot').ObjectSchema<{
        readonly id: import('valibot').StringSchema<undefined>;
        readonly color: LiteralUnionSchema<readonly ["amber", "green", "red", "other"]>;
        readonly label: import('valibot').StringSchema<undefined>;
    }, undefined>, undefined>;
    readonly statusId: LiteralUnionSchema<readonly ["alpha", "beta", "generalAvailability", "notApplicable", "preAlpha", "proposed", "releaseCandidate", "unavailable", "underReview"]>;
};
export declare const componentConfigSchema: import('valibot').ObjectSchema<{
    readonly typeId: LiteralUnionSchema<readonly ["app", "connector", "connectorConnection", "context", "contextModelGroup", "contextModel", "contextModelDimensionGroup", "contextModelDimension", "contextModelDimensionHierarchy", "contextModelEntityGroup", "contextModelEntity", "contextModelEntityDataItem", "contextModelEntityEvent", "contextModelEntityPrimaryMeasure", "contextModelSecondaryMeasureGroup", "contextModelSecondaryMeasure", "dataView", "dimension", "engine", "eventQuery", "presenter", "presenterPresentation", "tool"]>;
    readonly id: import('valibot').StringSchema<undefined>;
    readonly label: import('valibot').ObjectSchema<{
        readonly 'en-au': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly 'en-gb': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly 'en-us': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly 'es-es': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
    }, undefined>;
    readonly description: import('valibot').ObjectSchema<{
        readonly 'en-au': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly 'en-gb': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly 'en-us': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly 'es-es': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
    }, undefined>;
    readonly firstCreatedAt: import('valibot').OptionalSchema<import('valibot').NumberSchema<undefined>, undefined>;
    readonly icon: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly iconDark: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly lastUpdatedAt: import('valibot').NullableSchema<import('valibot').NumberSchema<undefined>, undefined>;
    readonly status: import('valibot').NullableSchema<import('valibot').ObjectSchema<{
        readonly id: import('valibot').StringSchema<undefined>;
        readonly color: LiteralUnionSchema<readonly ["amber", "green", "red", "other"]>;
        readonly label: import('valibot').StringSchema<undefined>;
    }, undefined>, undefined>;
    readonly statusId: LiteralUnionSchema<readonly ["alpha", "beta", "generalAvailability", "notApplicable", "preAlpha", "proposed", "releaseCandidate", "unavailable", "underReview"]>;
}, undefined>;
export declare const componentReferenceSchema: import('valibot').ObjectSchema<{
    readonly id: import('valibot').StringSchema<undefined>;
    readonly label: import('valibot').ObjectSchema<{
        readonly 'en-au': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly 'en-gb': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly 'en-us': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly 'es-es': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
    }, undefined>;
    readonly description: import('valibot').ObjectSchema<{
        readonly 'en-au': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly 'en-gb': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly 'en-us': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
        readonly 'es-es': import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
    }, undefined>;
    readonly icon: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly iconDark: import('valibot').NullableSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly order: import('valibot').NumberSchema<undefined>;
    readonly path: import('valibot').StringSchema<undefined>;
}, undefined>;
export {};
