/**
 * @file datapos-engine-support/src/eventQuery.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

import type { Component, ComponentConfig } from './component';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Event Query
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface EventQuery extends Component {
    placeholder?: string;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Event Query - Config
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export interface EventQueryConfig extends ComponentConfig {
    placeholder?: string;
}
