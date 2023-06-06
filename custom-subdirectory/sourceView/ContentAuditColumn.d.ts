/**
 * @file datapos-engine/src/ContentAuditColumn.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */
import { DataUsageTypeId, ParsedValue } from '..';
import { PreviewColumn } from './PreviewColumn';
export declare class ContentAuditColumn extends PreviewColumn {
    doCountIndividualValidValues: boolean;
    doCountPatterns: boolean;
    invalidValueCount: number;
    invalidValues: {
        recordNumber: number;
        value: string;
    }[];
    isRequired: boolean;
    isUnique: boolean;
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
    constructor(dataUsageTypeId: DataUsageTypeId, label: string);
    addInvalidValue(originalValue: string, recordNumber: number): string;
    addValidValue(originalValue: string, parsedValue: bigint | boolean | number | string | null, wholeDigitCount?: number, decimalDigitCount?: number): ParsedValue;
    addVoidValue(): null;
    finalise(): void;
    private determineNumericPattern;
    private determineTextPattern;
}
