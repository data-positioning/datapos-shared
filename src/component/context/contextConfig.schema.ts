/**
 * Context schema (drafted by Copilot).
 */

/** Dependencies - Vendor. */
import { array, literal, number, object } from 'valibot';

/** Dependencies - Framework. */
import { moduleConfigCoreFields } from '@/component/moduleConfig.schema';
import { componentConfigCoreFields, componentReferenceSchema, literalUnion } from '@/component/componentConfig.schema';

const contextOperationSchema = literalUnion(['list'] as const);

const contextModelGroupConfigSchema = object({
    ...componentConfigCoreFields,
    typeId: literal('contextModelGroup'),
    modelRefs: array(componentReferenceSchema),
    order: number()
});

export const contextConfigSchema = object({
    ...moduleConfigCoreFields,
    typeId: literal('context'),
    models: array(contextModelGroupConfigSchema),
    operations: array(contextOperationSchema)
});
