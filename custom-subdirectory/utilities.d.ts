/**
 * @file datapos-engine-support/src/utilities.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */
import { DataType } from './connection';
export declare const convertODataTypeToDataType: (type: string, maximumLength?: number) => DataType;
export declare const extractFileNameFromFilePath: (itemPath: string) => string | undefined;
export declare const extractFileExtensionFromFilePath: (itemPath: string) => string | undefined;
export declare const extractLastSegmentFromPath: (path: string) => string | undefined;
export declare const formatNumberAsDecimalNumber: (number?: number, decimalPlaces?: number, minimumFractionDigits?: number, locale?: string) => string;
export declare const formatNumberAsStorageSize: (number?: number) => string;
export declare const formatNumberAsDuration: (number?: number) => string;
export declare const formatNumberAsWholeNumber: (number?: number, locale?: string) => string;
/**
 * Lookup the mime type for a given file extension. Objective is to identify a mime type that may document how the data in the file is structured.
 * There is no guarantee that the data will actually be structured in this format.
 * @param extension A file extension for which to lookup the mime type.
 * @returns The mime type.
 */
export declare const lookupMimeTypeForFileExtension: (extension: string) => string;
