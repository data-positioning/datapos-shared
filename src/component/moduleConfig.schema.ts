/**
 * Module configuration schema.
 */

// Vendor dependencies.
import { object, string } from 'valibot';

// Framework dependencies.
import { componentConfigCoreFields, literalUnion } from './componentConfig.schema';

/**
 *
 */
const moduleTypeIdSchema = literalUnion(['app', 'engine', 'connector', 'context', 'presenter', 'tool'] as const);

/**
 *
 */
const moduleConfigCoreFields = {
    ...componentConfigCoreFields,
    version: string()
} as const;

/**
 *
 */
const moduleConfigSchema = object({
    ...moduleConfigCoreFields,
    typeId: moduleTypeIdSchema
});

// Exposures.
export { moduleConfigCoreFields, moduleConfigSchema, moduleTypeIdSchema };
