/**
 * @file datapos-engine-support/src/dimension.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */
import type { Component, ComponentConfig } from './component';
export interface Dimension extends Component {
    placeholder?: string;
}
export interface DimensionConfig extends ComponentConfig {
    placeholder?: string;
}
