/**
 * @file datapos-engine/src/PreviewColumn.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// Dependencies - Engine
import { DataUsageTypeId } from '.';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Preview Column
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class PreviewColumn {
    dataUsageTypeId: DataUsageTypeId;
    label: string;

    constructor(dataUsageTypeId: DataUsageTypeId, label: string) {
        this.dataUsageTypeId = dataUsageTypeId;
        this.label = label;
    }
}
