/**
 * @file datapos-engine-support/src/utilities.ts
 * @license ISC Licensed under the ISC license, Version 2.0. See the LICENSE.md file for details.
 * @author Jonathan Terrell <terrell.jm@gmail.com>
 * @copyright 2023 Jonathan Terrell
 */

// Engine Dependencies
import { DataType } from './connection';
import { DataStorageTypeId, DataUsageTypeId, type ErrorData } from '.';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Utilities - Extract
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const convertODataTypeToDataType = (type: string, maximumLength?: number): DataType => {
    // See: https://www.odata.org/documentation/odata-version-2-0/overview/
    switch (type) {
        case 'Edm.Binary':
            return { storageTypeId: DataStorageTypeId.Binary, usageTypeId: DataUsageTypeId.Binary };
        case 'Edm.Boolean':
            return { storageTypeId: DataStorageTypeId.Boolean, usageTypeId: DataUsageTypeId.Boolean };
        case 'Edm.Byte':
            return { storageTypeId: DataStorageTypeId.Byte, usageTypeId: DataUsageTypeId.WholeNumber };
        case 'Edm.DateTime':
            return { storageTypeId: DataStorageTypeId.DateTime, usageTypeId: DataUsageTypeId.DateTime };
        case 'Edm.DateTimeOffset':
            return { storageTypeId: DataStorageTypeId.DateTimeOffset, usageTypeId: DataUsageTypeId.DateTimeOffset };
        case 'Edm.Decimal':
            return { storageTypeId: DataStorageTypeId.Decimal, usageTypeId: DataUsageTypeId.DecimalNumber };
        case 'Edm.Double':
            return { storageTypeId: DataStorageTypeId.Double, usageTypeId: DataUsageTypeId.DecimalNumber };
        case 'Edm.Guid':
            return { storageTypeId: DataStorageTypeId.String, usageTypeId: DataUsageTypeId.String };
        case 'Edm.Int16':
            return { storageTypeId: DataStorageTypeId.Int16, usageTypeId: DataUsageTypeId.WholeNumber };
        case 'Edm.Int32':
            return { storageTypeId: DataStorageTypeId.Int32, usageTypeId: DataUsageTypeId.WholeNumber };
        case 'Edm.Int64':
            return { storageTypeId: DataStorageTypeId.Int64, usageTypeId: DataUsageTypeId.WholeNumber };
        case 'Edm.SByte':
            return { storageTypeId: DataStorageTypeId.Int8, usageTypeId: DataUsageTypeId.WholeNumber };
        case 'Edm.Single':
            return { storageTypeId: DataStorageTypeId.Single, usageTypeId: DataUsageTypeId.DecimalNumber };
        case 'Edm.String':
            return { storageTypeId: DataStorageTypeId.String, usageTypeId: DataUsageTypeId.String, maximumLength };
        case 'Edm.Time':
            return { storageTypeId: DataStorageTypeId.Time, usageTypeId: DataUsageTypeId.Time };
        default:
            return { storageTypeId: DataStorageTypeId.Unknown, usageTypeId: DataUsageTypeId.Unknown };
    }
};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Utilities - Extract
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 *
 * @param itemPath
 * @returns
 */
export const extractDirectoryPathFromEntryPath = (itemPath: string): string | undefined => {
    if (itemPath) {
        const lastIndex = itemPath.lastIndexOf('/');
        if (lastIndex > -1) return itemPath.substring(0, lastIndex);
    }
    return undefined;
};

/**
 *
 * @param itemPath
 * @returns
 */
export const extractExtensionFromEntryPath = (itemPath: string): string | undefined => {
    if (itemPath) {
        const lastExtensionIndex = itemPath.lastIndexOf('.');
        if (lastExtensionIndex > -1) return itemPath.substring(lastExtensionIndex + 1);
    }
    return undefined;
};

/**
 * Extract the last folder name from a path of folder names.
 * @param folderPath The path of folder names separated by slashes ('/').
 * @returns The name of the last folder in the path, or undefined if path is empty.
 */
export const extractLastFolderNameFromFolderPath = (folderPath: string): string | undefined => {
    if (folderPath) {
        let lastSeparatorIndex;
        let lastCharacterIndex;
        if (folderPath.endsWith('/')) {
            lastSeparatorIndex = folderPath.lastIndexOf('/', folderPath.length - 2);
            lastCharacterIndex = folderPath.length - 1;
        } else {
            lastSeparatorIndex = folderPath.lastIndexOf('/');
            lastCharacterIndex = folderPath.length;
        }
        if (lastSeparatorIndex > -1) return folderPath.substring(lastSeparatorIndex + 1, lastCharacterIndex);
    }
    return undefined;
};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Utilities - Formatters - Number
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const numberFormatterDefaultLocale = 'en-US';
const numberFormatterMap: Record<string, Intl.NumberFormat> = {};

export const formatNumberAsDecimalNumber = (number?: number, decimalPlaces = 2, minimumFractionDigits = decimalPlaces, locale = numberFormatterDefaultLocale): string => {
    if (number === null || number === undefined) return '';
    const formatterId = `${locale}decimal${decimalPlaces}.${minimumFractionDigits}`;
    let numberFormatter = numberFormatterMap[formatterId];
    if (!numberFormatter) {
        numberFormatter = new Intl.NumberFormat(locale, {
            localeMatcher: 'best fit',
            maximumFractionDigits: decimalPlaces,
            minimumFractionDigits,
            minimumIntegerDigits: 1,
            style: 'decimal',
            useGrouping: true
        });
        numberFormatterMap[formatterId] = numberFormatter;
    }
    return numberFormatter.format(number);
};

export const formatNumberAsStorageSize = (number?: number): string => {
    if (number === null || number === undefined) return '';
    if (number === 1) return '1 byte';
    if (number < 1024) return `${formatNumberAsWholeNumber(number)} bytes`;
    if (number < 1048576) return `${formatNumberAsDecimalNumber(number / 1024, 2, 0)} KB`;
    if (number < 1073741824) return `${formatNumberAsDecimalNumber(number / 1048576, 2, 0)} MB`;
    if (number < 1099511627776) return `${formatNumberAsDecimalNumber(number / 1073741824, 2, 0)} GB`;
    return `${formatNumberAsDecimalNumber(number / 1099511627776, 2, 0)} TB`;
};

export const formatNumberAsWholeNumber = (number?: number, locale = numberFormatterDefaultLocale): string => {
    if (number === null || number === undefined) return '';
    const formatterId = `${locale}decimal0.0`;
    let numberFormatter = numberFormatterMap[formatterId];
    if (!numberFormatter) {
        numberFormatter = new Intl.NumberFormat(locale, {
            localeMatcher: 'best fit',
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
            minimumIntegerDigits: 1,
            style: 'decimal',
            useGrouping: true
        });
        numberFormatterMap[formatterId] = numberFormatter;
    }
    return numberFormatter.format(number);
};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Utilities - Lookup
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * Lookup the mime type for a given file extension. Objective is to identify a mime type that may document how the data in the file is structured.
 * There is no guarantee that the data will actually be structured in this format.
 * @param extension A file extension for which to lookup the mime type.
 * @returns The mime type.
 */
export const lookupMimeTypeForFileExtension = (extension: string): string => {
    switch (extension) {
        case 'csv':
            return 'text/csv';
        case 'tab':
        case 'tsv':
            return 'text/tab-separated-values';
        case 'xls':
            return 'application/vnd.ms-excel';
        case 'xlsx':
            return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        default:
            return 'application/octet-stream';
    }
};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Utilities - Vendor Access Token
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * Establish a vendor access token.
 * @param connectionItem
 * @param accountId
 * @param sessionAccessToken
 * @param vendorRefreshURI
 * @returns The connection access token.
 */
// export const establishVendorAccessToken = async (connectionItem: ConnectionItem, accountId: string, sessionAccessToken: string, vendorRefreshURI: string): Promise<string> => {
export const establishVendorAccessToken = async (connectionItem: any, accountId: string, sessionAccessToken: string, vendorRefreshURI: string): Promise<string> => {
    let accessToken;

    // If the current dropbox access token expires within 5 minutes then refresh it and return the new one, otherwise return the current one.
    if (connectionItem.authorization![''].expires_at - Date.now() < 300000) {
        // TODO: Above is WRONG 'connectionItem.authorization!['']'. We need to know what authorisation.
        const headers = {
            'Account-Id': accountId,
            Authorization: sessionAccessToken,
            'Connection-Id': connectionItem.id
        };
        const response = await fetch(vendorRefreshURI, { headers });
        if (!response.ok) {
            const data: ErrorData = {
                body: {
                    context: 'establishVendorAccessToken',
                    message: await response.text()
                },
                statusCode: response.status,
                statusText: response.statusText
            };
            throw new Error('Unable to establish access token.|' + JSON.stringify(data));
        }
        accessToken = await response.text();
    } else {
        accessToken = connectionItem.authorization![''].access_token as string; // TODO: This is WRONG 'connectionItem.authorization!['']'. We need to know what authorisation.
    }

    return accessToken;
};
