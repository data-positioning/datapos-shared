/**
 * Application utilities.
 */
export declare const convertODataTypeIdToUsageTypeId: (oDataTypeId: string) => string;
export declare const extractNameFromPath: (itemPath: string) => string | undefined;
export declare const extractExtensionFromPath: (itemPath: string) => string | undefined;
export declare const formatNumberAsDecimalNumber: (number?: number, decimalPlaces?: number, minimumFractionDigits?: number, locale?: string) => string;
export declare const formatNumberAsSize: (number?: number) => string;
export declare const formatNumberAsStorageSize: (number?: number) => string;
export declare const formatNumberAsDuration: (number?: number) => string;
export declare const formatNumberAsWholeNumber: (number?: number, locale?: string) => string;
export declare const lookupMimeTypeForExtension: (extension: string) => string;
