/**
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 * @file datapos-engine-support/src/reportTemplate.ts
 * @license ISC
 */

// Engine Dependencies
import type { PrimaryComponentConfig } from '.';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Report Template - Config
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface ReportTemplateConfig extends PrimaryComponentConfig {
    placeholder?: string;
}
