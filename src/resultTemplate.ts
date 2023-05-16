/**
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 * @file datapos-engine-support/src/resultTemplate.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 */

// Engine Dependencies
import type { ComponentConfig } from '.';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Report Template - Config
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface ResultTemplateConfig extends ComponentConfig {
    placeholder?: string;
}
