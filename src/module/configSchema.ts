import { z } from 'zod';

export const localeCodeSchema = z.enum(['en-au', 'en-gb', 'en-us', 'es-es']);

export const moduleTypeIdSchema = z.enum(['app', 'engine', 'connector', 'context', 'informer', 'presenter']);

export const partialLocalisedStringSchema = z.object({
    'en-au': z.string().optional(),
    'en-gb': z.string().optional(),
    'en-us': z.string().optional(),
    'es-es': z.string().optional()
});

export const moduleConfigSchema = z.object({
    id: z.string(),
    label: partialLocalisedStringSchema,
    description: partialLocalisedStringSchema,
    statusId: z.unknown(),
    typeId: moduleTypeIdSchema,
    version: z.string()
});

export type ModuleConfigZ = z.infer<typeof moduleConfigSchema>;
