/**
 * @file datapos-engine/src/SourceViewContentAuditField.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// Constants
const MAX_INVALID_VALUE_COUNT = 100;

// Dependencies - Engine
import { DataUsageTypeId } from '.';

// interface SourceViewContentAuditField extends SourceViewPreviewField {
//     dataUsageTypeId: DataUsageTypeId;
//     id: string;
//     invalidValueCount: number;
//     missingValueCount: number;
//     uniqueValueCount: number;
//     validValueCount: number;
//     values: Record<string, number>;
// }

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Column
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export class SourceViewContentAuditField {
    dataUsageTypeId: DataUsageTypeId;
    doCountIndividualValidValues: boolean;
    doCountPatterns: boolean;
    invalidValueCount: number;
    invalidValues: { recordNumber: number; value: string }[];
    isRequired: boolean;
    isUnique: boolean;
    label: string;
    maxDecimals: number;
    maxSize: number;
    maxValue: boolean | number | string | undefined;
    minDecimals: number;
    minSize: number;
    minValue: boolean | number | string | undefined;
    patterns: Record<string, number>;
    validValueCount: number;
    validValues: Record<string, number>;
    voidValueCount: number;

    constructor(dataUsageTypeId: DataUsageTypeId, label: string) {
        this.dataUsageTypeId = dataUsageTypeId;
        this.label = label;
        this.invalidValueCount = 0;
        this.invalidValues = [];
        this.isRequired = false;
        this.isUnique = false;
        this.maxDecimals = 0;
        this.maxSize = 0;
        this.maxValue = undefined;
        this.minDecimals = 0;
        this.minSize = 0;
        this.minValue = undefined;
        this.patterns = {};
        this.validValueCount = 0;
        this.validValues = {};
        this.voidValueCount = 0;

        // this.currencySigns = undefined;
        // this.currencySymbols = undefined;
        // this.decimalSeparator = undefined;
        // this.groupSeparator = undefined;

        this.doCountIndividualValidValues =
            this.dataUsageTypeId === DataUsageTypeId.Boolean || this.dataUsageTypeId === DataUsageTypeId.String || this.dataUsageTypeId === DataUsageTypeId.WholeNumber;
        this.doCountPatterns = true;

        switch (this.dataUsageTypeId) {
            case DataUsageTypeId.String:
                this.maxValue = '';
                this.minValue = '';
                break;
        }
    }

    addInvalidValue(originalValue: string, recordNumber: number) {
        if (this.invalidValues.length < MAX_INVALID_VALUE_COUNT) this.invalidValues.push({ recordNumber, value: originalValue });
        this.invalidValueCount++;
        return originalValue;
    }

    addValidValue(originalValue: string, parsedValue: bigint | boolean | number | string | null, wholeDigitCount?: number, decimalDigitCount?: number) {
        switch (this.dataUsageTypeId) {
            case DataUsageTypeId.String: {
                parsedValue = originalValue;
                const length = originalValue.length;
                if (this.maxSize) {
                    if (length < this.minSize) this.minSize = length;
                    else if (length > this.maxSize) this.maxSize = length;
                    if (!this.minValue || originalValue < this.minValue) this.minValue = originalValue;
                    else if (!this.maxValue || originalValue > this.maxValue) this.maxValue = originalValue;
                } else {
                    this.maxSize = length;
                    this.minSize = length;
                    this.maxValue = originalValue;
                    this.minValue = originalValue;
                }
                break;
            }
            default:
                break;
        }

        if (this.doCountPatterns) {
            const pattern =
                this.dataUsageTypeId === DataUsageTypeId.DecimalNumber || this.dataUsageTypeId == DataUsageTypeId.WholeNumber
                    ? this.determineNumericPattern(originalValue)
                    : this.determineTextPattern(originalValue);
            this.patterns[pattern] = (this.patterns[pattern] || 0) + 1;
        }

        if (this.doCountIndividualValidValues) this.validValues[String(parsedValue)] = (this.validValues[String(parsedValue)] || 0) + 1;
        this.validValueCount++;
        return parsedValue;
    }

    addVoidValue(): null {
        this.voidValueCount++;
        return null;
    }

    finalise() {
        if (this.doCountIndividualValidValues) this.isUnique = this.validValueCount > 0 && this.validValueCount === Object.keys(this.validValues).length;

        if (this.voidValueCount === 0) this.isRequired = true;
    }

    private determineNumericPattern(originalValue: string) {
        let pattern = '';
        for (let index = 0; index < originalValue.length; index++) {
            const char = originalValue.charAt(index);
            if (char >= '0' && char <= '9') {
                pattern += '9';
            } else {
                pattern += char;
            }
        }
        return pattern;
    }

    private determineTextPattern(originalValue: string) {
        let pattern = '';
        for (let index = 0; index < originalValue.length; index++) {
            const char = originalValue.charAt(index);
            if (char >= '0' && char <= '9') {
                pattern += '9';
            } else if (char >= 'a' && char <= 'z') {
                pattern += 'a';
            } else if (char >= 'A' && char <= 'Z') {
                pattern += 'A';
            } else {
                pattern += char;
            }
        }
        return pattern;
    }
}
