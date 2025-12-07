import { z } from 'zod';
export declare const presenterConfigSchema: z.ZodObject<{
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
    presentations: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodRecord<z.ZodString, z.ZodString>;
        description: z.ZodRecord<z.ZodString, z.ZodString>;
        icon: z.ZodOptional<z.ZodString>;
        iconDark: z.ZodOptional<z.ZodString>;
        order: z.ZodNumber;
        path: z.ZodString;
    }, z.core.$strip>>;
    operations: z.ZodArray<z.ZodUnion<readonly [z.ZodLiteral<"list">, z.ZodLiteral<"render">, z.ZodLiteral<"setColorMode">]>>;
    typeId: z.ZodLiteral<"presenter">;
}, z.core.$strip>;
