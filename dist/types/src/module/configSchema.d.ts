import { z } from 'zod';
export declare const partialLocalisedStringSchema: z.ZodObject<{
    'en-au': z.ZodOptional<z.ZodString>;
    'en-gb': z.ZodOptional<z.ZodString>;
    'en-us': z.ZodOptional<z.ZodString>;
    'es-es': z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const moduleConfigSchema: z.ZodObject<{
    id: z.ZodString;
    label: z.ZodObject<{
        'en-au': z.ZodOptional<z.ZodString>;
        'en-gb': z.ZodOptional<z.ZodString>;
        'en-us': z.ZodOptional<z.ZodString>;
        'es-es': z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    description: z.ZodObject<{
        'en-au': z.ZodOptional<z.ZodString>;
        'en-gb': z.ZodOptional<z.ZodString>;
        'en-us': z.ZodOptional<z.ZodString>;
        'es-es': z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    statusId: z.ZodUnknown;
    typeId: z.ZodEnum<{
        connector: "connector";
        context: "context";
        presenter: "presenter";
        informer: "informer";
        app: "app";
        engine: "engine";
    }>;
    version: z.ZodString;
}, z.core.$strip>;
export type ModuleConfigZ = z.infer<typeof moduleConfigSchema>;
