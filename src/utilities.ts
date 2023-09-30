import { type FieldDataType, FieldStorageTypeId, FieldUsageTypeId } from './connection';

const numberFormatterDefaultLocale = 'en-US';
const numberFormatterMap: Record<string, Intl.NumberFormat> = {};

// Utilities - Convert
// See: https://www.odata.org/documentation/odata-version-2-0/overview/.
export const convertODataTypeToDataType = (type: string, maximumLength?: number): FieldDataType => {
    switch (type) {
        case 'Edm.Binary':
            return { storageTypeId: FieldStorageTypeId.Binary, usageTypeId: FieldUsageTypeId.Unknown }; // Binary...
        case 'Edm.Boolean':
            return { storageTypeId: FieldStorageTypeId.Boolean, usageTypeId: FieldUsageTypeId.Boolean };
        case 'Edm.Byte':
            return { storageTypeId: FieldStorageTypeId.Byte, usageTypeId: FieldUsageTypeId.WholeNumber };
        case 'Edm.DateTime':
            return { storageTypeId: FieldStorageTypeId.DateTime, usageTypeId: FieldUsageTypeId.Moment }; // DateTime...
        case 'Edm.DateTimeOffset':
            return { storageTypeId: FieldStorageTypeId.DateTimeOffset, usageTypeId: FieldUsageTypeId.Moment }; // DateTimeOffset...
        case 'Edm.Decimal':
            return { storageTypeId: FieldStorageTypeId.Decimal, usageTypeId: FieldUsageTypeId.DecimalNumber };
        case 'Edm.Double':
            return { storageTypeId: FieldStorageTypeId.Double, usageTypeId: FieldUsageTypeId.DecimalNumber };
        case 'Edm.Guid':
            return { storageTypeId: FieldStorageTypeId.String, usageTypeId: FieldUsageTypeId.String };
        case 'Edm.Int16':
            return { storageTypeId: FieldStorageTypeId.Int16, usageTypeId: FieldUsageTypeId.WholeNumber };
        case 'Edm.Int32':
            return { storageTypeId: FieldStorageTypeId.Int32, usageTypeId: FieldUsageTypeId.WholeNumber };
        case 'Edm.Int64':
            return { storageTypeId: FieldStorageTypeId.Int64, usageTypeId: FieldUsageTypeId.WholeNumber };
        case 'Edm.SByte':
            return { storageTypeId: FieldStorageTypeId.Int8, usageTypeId: FieldUsageTypeId.WholeNumber };
        case 'Edm.Single':
            return { storageTypeId: FieldStorageTypeId.Single, usageTypeId: FieldUsageTypeId.DecimalNumber };
        case 'Edm.String':
            return { storageTypeId: FieldStorageTypeId.String, usageTypeId: FieldUsageTypeId.String, maximumLength };
        case 'Edm.Time':
            return { storageTypeId: FieldStorageTypeId.Time, usageTypeId: FieldUsageTypeId.Moment }; // Time...
        default:
            return { storageTypeId: FieldStorageTypeId.Unknown, usageTypeId: FieldUsageTypeId.Unknown };
    }
};

// Utilities - Extract
// export const extractFolderPathFromFilePath = (itemPath: string): string | undefined => {
//     if (itemPath) {
//         const lastIndex = itemPath.lastIndexOf('/');
//         if (lastIndex > -1) return itemPath.substring(0, lastIndex);
//     }
//     return undefined;
// };

// Utilities - Extract
export const extractFileNameFromFilePath = (itemPath: string): string | undefined => {
    if (itemPath) {
        const lastSeparatorIndex = itemPath.lastIndexOf('/');
        const lastExtensionIndex = itemPath.lastIndexOf('.', lastSeparatorIndex > -1 ? lastSeparatorIndex : itemPath.length);
        return lastExtensionIndex > -1 ? itemPath.substring(0, lastExtensionIndex) : itemPath;
    }
    return undefined;
};

// Utilities - Extract
export const extractFileExtensionFromFilePath = (itemPath: string): string | undefined => {
    if (itemPath) {
        const lastExtensionIndex = itemPath.lastIndexOf('.');
        if (lastExtensionIndex > -1) return itemPath.substring(lastExtensionIndex + 1);
    }
    return undefined;
};

// Utilities - Extract
// export const extractLastSegmentFromPath = (path: string): string | undefined => {
//     if (path) {
//         let lastSeparatorIndex;
//         let lastCharacterIndex;
//         if (path.endsWith('/')) {
//             lastSeparatorIndex = path.lastIndexOf('/', path.length - 2);
//             lastCharacterIndex = path.length - 1;
//         } else {
//             lastSeparatorIndex = path.lastIndexOf('/');
//             lastCharacterIndex = path.length;
//         }
//         return lastSeparatorIndex > -1 ? path.substring(lastSeparatorIndex + 1, lastCharacterIndex) : path;
//     }
//     return undefined;
// };

// Utilities - Format Number
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

// Utilities - Format Number
export const formatNumberAsStorageSize = (number?: number): string => {
    if (number === null || number === undefined) return '';
    if (number === 1) return '1 byte';
    if (number < 1024) return `${formatNumberAsWholeNumber(number)} bytes`;
    if (number < 1048576) return `${formatNumberAsDecimalNumber(number / 1024, 2, 0)} KB`;
    if (number < 1073741824) return `${formatNumberAsDecimalNumber(number / 1048576, 2, 0)} MB`;
    if (number < 1099511627776) return `${formatNumberAsDecimalNumber(number / 1073741824, 2, 0)} GB`;
    return `${formatNumberAsDecimalNumber(number / 1099511627776, 2, 0)} TB`;
};

// Utilities - Format Number
export const formatNumberAsDuration = (number?: number): string => {
    if (number === null || number === undefined) return '';
    if (number < 1000) return `${formatNumberAsWholeNumber(number)} ms`;
    if (number === 1000) return `${formatNumberAsWholeNumber(number)} sec`;
    if (number < 60000) return `${formatNumberAsDecimalNumber(number / 1000, 2, 0)} secs`;
    if (number === 60000) return '1 min';
    if (number < 3600000) return `${formatNumberAsDecimalNumber(number / 60000, 2, 0)} mins`;
    if (number === 3600000) return '1 hr';
    if (number < 86400000) return `${formatNumberAsDecimalNumber(number / 3600000, 2, 0)} hrs`;
    if (number === 86400000) return '1 day';
    return `${formatNumberAsDecimalNumber(number / 86400000, 2, 0)} days`;
};

// Utilities - Format Number
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

// Utilities - Lookup
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

// Utilities
// // export const establishVendorAccessToken = async (connectionItem: ConnectionItem, accountId: string, sessionAccessToken: string, vendorRefreshURI: string): Promise<string> => {
// export const establishVendorAccessToken = async (connectionItem: any, accountId: string, sessionAccessToken: string, vendorRefreshURI: string): Promise<string> => {
//     let accessToken;

//     // If the current dropbox access token expires within 5 minutes then refresh it and return the new one, otherwise return the current one.
//     if (connectionItem.authorization[''].expires_at - Date.now() < 300000) {
//         // TODO: Above is WRONG 'connectionItem.authorization!['']'. We need to know what authorisation.
//         const headers = {
//             'Account-Id': accountId,
//             Authorization: sessionAccessToken,
//             'Connection-Id': connectionItem.id
//         };
//         const response = await fetch(vendorRefreshURI, { headers });
//         if (!response.ok) {
//             const data: ErrorData = {
//                 body: {
//                     context: 'establishVendorAccessToken',
//                     message: await response.text()
//                 },
//                 statusCode: response.status,
//                 statusText: response.statusText
//             };
//             throw new Error('Unable to establish access token.|' + JSON.stringify(data));
//         }
//         accessToken = await response.text();
//     } else {
//         accessToken = connectionItem.authorization[''].access_token as string; // TODO: This is WRONG 'connectionItem.authorization!['']'. We need to know what authorisation.
//     }

//     return accessToken;
// };
