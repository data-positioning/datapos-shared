import { z } from 'zod';
export declare const connectorImplementationSchema: z.ZodObject<{
    activeConnectionCount: z.ZodOptional<z.ZodNumber>;
    canDescribe: z.ZodOptional<z.ZodBoolean>;
    id: z.ZodOptional<z.ZodString>;
    authMethodId: z.ZodUnion<readonly [z.ZodLiteral<"apiKey">, z.ZodLiteral<"disabled">, z.ZodLiteral<"oAuth2">, z.ZodLiteral<"none">]>;
    label: z.ZodOptional<z.ZodRecord<z.ZodUnion<readonly [z.ZodLiteral<"en-au">, z.ZodLiteral<"en-gb">, z.ZodLiteral<"en-us">, z.ZodLiteral<"es-es">]>, z.ZodString>>;
    maxConnectionCount: z.ZodOptional<z.ZodNumber>;
    params: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodString>>>;
}, z.core.$strip>;
export declare const connectorConfigSchema: z.ZodObject<{
    id: z.ZodString;
    label: z.ZodRecord<z.ZodString, z.ZodString>;
    description: z.ZodRecord<z.ZodString, z.ZodString>;
    firstCreatedAt: z.ZodOptional<z.ZodNumber>;
    icon: z.ZodOptional<z.ZodString>;
    iconDark: z.ZodOptional<z.ZodString>;
    lastUpdatedAt: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        color: z.ZodUnion<readonly [z.ZodLiteral<"amber">, z.ZodLiteral<"green">, z.ZodLiteral<"red">, z.ZodLiteral<"other">]>;
        label: z.ZodString;
    }, z.core.$strip>>>;
    statusId: z.ZodUnion<readonly [z.ZodLiteral<"alpha">, z.ZodLiteral<"beta">, z.ZodLiteral<"generalAvailability">, z.ZodLiteral<"notApplicable">, z.ZodLiteral<"preAlpha">, z.ZodLiteral<"proposed">, z.ZodLiteral<"releaseCandidate">, z.ZodLiteral<"unavailable">, z.ZodLiteral<"underReview">]>;
    version: z.ZodString;
    category: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodString;
    }, z.core.$strip>>;
    categoryId: z.ZodUnion<readonly [z.ZodLiteral<"application">, z.ZodLiteral<"curatedDataset">, z.ZodLiteral<"database">, z.ZodLiteral<"fileStore">]>;
    implementations: z.ZodRecord<z.ZodString, z.ZodObject<{
        activeConnectionCount: z.ZodOptional<z.ZodNumber>;
        canDescribe: z.ZodOptional<z.ZodBoolean>;
        id: z.ZodOptional<z.ZodString>;
        authMethodId: z.ZodUnion<readonly [z.ZodLiteral<"apiKey">, z.ZodLiteral<"disabled">, z.ZodLiteral<"oAuth2">, z.ZodLiteral<"none">]>;
        label: z.ZodOptional<z.ZodRecord<z.ZodUnion<readonly [z.ZodLiteral<"en-au">, z.ZodLiteral<"en-gb">, z.ZodLiteral<"en-us">, z.ZodLiteral<"es-es">]>, z.ZodString>>;
        maxConnectionCount: z.ZodOptional<z.ZodNumber>;
        params: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodString>>>;
    }, z.core.$strip>>;
    operations: z.ZodArray<z.ZodUnion<readonly [z.ZodLiteral<"abortOperation">, z.ZodLiteral<"authenticateConnection">, z.ZodLiteral<"createObject">, z.ZodLiteral<"describeConnection">, z.ZodLiteral<"dropObject">, z.ZodLiteral<"findObject">, z.ZodLiteral<"getRecord">, z.ZodLiteral<"listNodes">, z.ZodLiteral<"previewObject">, z.ZodLiteral<"removeRecords">, z.ZodLiteral<"retrieveRecords">, z.ZodLiteral<"upsertRecords">]>>;
    typeId: z.ZodLiteral<"connector">;
    usageId: z.ZodUnion<readonly [z.ZodLiteral<"bidirectional">, z.ZodLiteral<"destination">, z.ZodLiteral<"source">, z.ZodLiteral<"unknown">]>;
    vendorAccountURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    vendorDocumentationURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    vendorHomeURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
