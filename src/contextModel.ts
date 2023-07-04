/**
 * @file datapos-engine-support/src/contextModel.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// Dependencies - Engine - Support
import type { Component, ComponentConfig } from './component';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Context Model
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface ContextModel extends Component {
    placeholder?: string;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Context Model - Config
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface ContextModelConfig extends ComponentConfig {
    placeholder?: string;
}
