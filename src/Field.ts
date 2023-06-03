/**
 * @file datapos-engine/src/Field.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// Dependencies - Engine
import { DataUsageTypeId } from '.';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Field
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class Field {
    dataUsageTypeId: DataUsageTypeId;
    label: string;

    constructor(dataUsageTypeId: DataUsageTypeId, label: string) {
        this.dataUsageTypeId = dataUsageTypeId;
        this.label = label;
    }
}
