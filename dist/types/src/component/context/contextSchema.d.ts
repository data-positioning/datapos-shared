import { z } from 'zod';
export declare const contextConfigSchema: z.ZodObject<{
    id: z.ZodString;
    label: z.ZodRecord<z.ZodString, z.ZodString>;
    description: z.ZodRecord<z.ZodString, z.ZodString>;
    firstCreatedAt: z.ZodOptional<z.ZodNumber>;
    icon: z.ZodOptional<z.ZodString>;
    iconDark: z.ZodOptional<z.ZodString>;
    lastUpdatedAt: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        color: z.ZodUnion<readonly [z.ZodLiteral<"amber">, z.ZodLiteral<"green">, z.ZodLiteral<"red">, z.ZodLiteral<"other">]>;
        label: z.ZodString;
    }, z.core.$strip>>;
    statusId: z.ZodUnion<readonly [z.ZodLiteral<"alpha">, z.ZodLiteral<"beta">, z.ZodLiteral<"generalAvailability">, z.ZodLiteral<"notApplicable">, z.ZodLiteral<"preAlpha">, z.ZodLiteral<"proposed">, z.ZodLiteral<"releaseCandidate">, z.ZodLiteral<"unavailable">, z.ZodLiteral<"underReview">]>;
    version: z.ZodString;
    models: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodRecord<z.ZodString, z.ZodString>;
        description: z.ZodRecord<z.ZodString, z.ZodString>;
        firstCreatedAt: z.ZodOptional<z.ZodNumber>;
        icon: z.ZodOptional<z.ZodString>;
        iconDark: z.ZodOptional<z.ZodString>;
        lastUpdatedAt: z.ZodOptional<z.ZodNumber>;
        status: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            color: z.ZodUnion<readonly [z.ZodLiteral<"amber">, z.ZodLiteral<"green">, z.ZodLiteral<"red">, z.ZodLiteral<"other">]>;
            label: z.ZodString;
        }, z.core.$strip>>;
        statusId: z.ZodUnion<readonly [z.ZodLiteral<"alpha">, z.ZodLiteral<"beta">, z.ZodLiteral<"generalAvailability">, z.ZodLiteral<"notApplicable">, z.ZodLiteral<"preAlpha">, z.ZodLiteral<"proposed">, z.ZodLiteral<"releaseCandidate">, z.ZodLiteral<"unavailable">, z.ZodLiteral<"underReview">]>;
        typeId: z.ZodUnion<readonly [z.ZodLiteral<"app">, z.ZodLiteral<"connector">, z.ZodLiteral<"connectorConnection">, z.ZodLiteral<"context">, z.ZodLiteral<"contextModelGroup">, z.ZodLiteral<"contextModel">, z.ZodLiteral<"contextModelDimensionGroup">, z.ZodLiteral<"contextModelDimension">, z.ZodLiteral<"contextModelDimensionHierarchy">, z.ZodLiteral<"contextModelEntityGroup">, z.ZodLiteral<"contextModelEntity">, z.ZodLiteral<"contextModelEntityDataItem">, z.ZodLiteral<"contextModelEntityEvent">, z.ZodLiteral<"contextModelEntityPrimaryMeasure">, z.ZodLiteral<"contextModelSecondaryMeasureGroup">, z.ZodLiteral<"contextModelSecondaryMeasure">, z.ZodLiteral<"dataView">, z.ZodLiteral<"dimension">, z.ZodLiteral<"engine">, z.ZodLiteral<"eventQuery">, z.ZodLiteral<"presenter">, z.ZodLiteral<"presenterPresentation">, z.ZodLiteral<"tool">]>;
        modelRefs: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodRecord<z.ZodString, z.ZodString>;
            description: z.ZodRecord<z.ZodString, z.ZodString>;
            icon: z.ZodOptional<z.ZodString>;
            iconDark: z.ZodOptional<z.ZodString>;
            order: z.ZodNumber;
            path: z.ZodString;
        }, z.core.$strip>>;
        order: z.ZodNumber;
    }, z.core.$strip>>;
    operations: z.ZodArray<z.ZodLiteral<"list">>;
    typeId: z.ZodLiteral<"context">;
}, z.core.$strip>;
