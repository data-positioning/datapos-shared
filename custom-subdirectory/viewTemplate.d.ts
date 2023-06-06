/**
 * @file datapos-engine-support/src/viewTemplate.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */
import type { Component, ComponentConfig } from './component';
export interface ViewTemplate extends Component {
    placeholder?: string;
}
export interface ViewTemplateConfig extends ComponentConfig {
    placeholder?: string;
}
