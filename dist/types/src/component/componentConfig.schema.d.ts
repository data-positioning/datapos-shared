export declare const literalUnion: <const T extends readonly string[]>(values: T) => import('valibot').UnionSchema<import('valibot').LiteralSchema<string, undefined>[], undefined>;
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
export declare const statusColorIdSchema: import('valibot').UnionSchema<import('valibot').LiteralSchema<string, undefined>[], undefined>;
export declare const componentStatusIdSchema: import('valibot').UnionSchema<import('valibot').LiteralSchema<string, undefined>[], undefined>;
export declare const componentTypeIdSchema: import('valibot').UnionSchema<import('valibot').LiteralSchema<string, undefined>[], undefined>;
export declare const moduleTypeIdSchema: import('valibot').UnionSchema<import('valibot').LiteralSchema<string, undefined>[], undefined>;
export declare const componentStatusSchema: import('valibot').ObjectSchema<{
    readonly id: import('valibot').StringSchema<undefined>;
    readonly color: import('valibot').UnionSchema<import('valibot').LiteralSchema<string, undefined>[], undefined>;
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
        readonly color: import('valibot').UnionSchema<import('valibot').LiteralSchema<string, undefined>[], undefined>;
        readonly label: import('valibot').StringSchema<undefined>;
    }, undefined>, undefined>;
    readonly statusId: import('valibot').UnionSchema<import('valibot').LiteralSchema<string, undefined>[], undefined>;
};
export declare const componentConfigSchema: import('valibot').ObjectSchema<{
    readonly typeId: import('valibot').UnionSchema<import('valibot').LiteralSchema<string, undefined>[], undefined>;
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
        readonly color: import('valibot').UnionSchema<import('valibot').LiteralSchema<string, undefined>[], undefined>;
        readonly label: import('valibot').StringSchema<undefined>;
    }, undefined>, undefined>;
    readonly statusId: import('valibot').UnionSchema<import('valibot').LiteralSchema<string, undefined>[], undefined>;
}, undefined>;
export declare const moduleConfigCoreFields: {
    readonly version: import('valibot').StringSchema<undefined>;
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
        readonly color: import('valibot').UnionSchema<import('valibot').LiteralSchema<string, undefined>[], undefined>;
        readonly label: import('valibot').StringSchema<undefined>;
    }, undefined>, undefined>;
    readonly statusId: import('valibot').UnionSchema<import('valibot').LiteralSchema<string, undefined>[], undefined>;
};
export declare const moduleConfigSchema: import('valibot').ObjectSchema<{
    readonly typeId: import('valibot').UnionSchema<import('valibot').LiteralSchema<string, undefined>[], undefined>;
    readonly version: import('valibot').StringSchema<undefined>;
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
        readonly color: import('valibot').UnionSchema<import('valibot').LiteralSchema<string, undefined>[], undefined>;
        readonly label: import('valibot').StringSchema<undefined>;
    }, undefined>, undefined>;
    readonly statusId: import('valibot').UnionSchema<import('valibot').LiteralSchema<string, undefined>[], undefined>;
}, undefined>;
export declare const componentRefSchema: import('valibot').ObjectSchema<{
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
    readonly icon: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly iconDark: import('valibot').OptionalSchema<import('valibot').StringSchema<undefined>, undefined>;
    readonly order: import('valibot').NumberSchema<undefined>;
    readonly path: import('valibot').StringSchema<undefined>;
}, undefined>;
