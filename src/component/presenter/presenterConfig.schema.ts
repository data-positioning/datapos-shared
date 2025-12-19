import { array, literal, object } from 'valibot';

import { componentReferenceSchema, literalUnion, moduleConfigCoreFields } from '@/component/componentConfig.schema';

const presenterOperationSchema = literalUnion(['list', 'render', 'setColorMode'] as const);

export const presenterConfigSchema = object({
    ...moduleConfigCoreFields,
    typeId: literal('presenter'),
    presentations: array(componentReferenceSchema),
    operations: array(presenterOperationSchema)
});
