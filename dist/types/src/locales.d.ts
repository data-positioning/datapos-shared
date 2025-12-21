/**
 * Locale-related types and defaults shared across modules.
 */
export type LocaleCode = 'en-au' | 'en-gb' | 'en-us' | 'es-es';
export type LocalisedString = Record<LocaleCode, string>;
/** Fallback locale used whenever a more specific locale is unavailable. */
export declare const DEFAULT_LOCALE_CODE: LocaleCode;
