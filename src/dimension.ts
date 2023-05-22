/**
 * @file datapos-engine-support/src/dimension.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// Dependencies - Engine
import type { Component, ComponentConfig } from './component';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dimension
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface Dimension extends Component {
    placeholder: string;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dimension - Config
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface DimensionConfig extends ComponentConfig {
    placeholder: string;
}
