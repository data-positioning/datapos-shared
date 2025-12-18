import { array, literal, number, object } from 'valibot';

import { componentConfigCoreFields, componentRefSchema, literalUnion, moduleConfigCoreFields } from '@/component/componentConfig.schema';

const contextOperationSchema = literalUnion(['list'] as const);

const contextModelGroupConfigSchema = object({
    ...componentConfigCoreFields,
    typeId: literal('contextModelGroup'),
    modelRefs: array(componentRefSchema),
    order: number()
});

export const contextConfigSchema = object({
    ...moduleConfigCoreFields,
    typeId: literal('context'),
    models: array(contextModelGroupConfigSchema),
    operations: array(contextOperationSchema)
});
