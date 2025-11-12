import { PreviewColumn } from './OLD_PreviewColumn';
export type ParsedValue = {
    isValid: boolean;
    value: bigint | boolean | number | string | null;
};
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
    constructor(dataUsageTypeId: string, label: string);
    addInvalidValue(originalValue: string, recordNumber: number): string;
    addValidValue(originalValue: string, parsedValue: ParsedValue, wholeDigitCount?: number, decimalDigitCount?: number): ParsedValue;
    addVoidValue(): null;
    finalise(): void;
    private determineNumericPattern;
    private determineTextPattern;
}
