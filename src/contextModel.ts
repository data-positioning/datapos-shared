/**
 * @file datapos-engine-support/src/contextModel.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// Engine Dependencies
import type { Component, ComponentConfig } from './component';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Context Model
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface ContextModel extends Component {}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Context Model - Config
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface ContextModelConfig extends ComponentConfig {}
