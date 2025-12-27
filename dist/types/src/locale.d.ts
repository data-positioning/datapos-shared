/**
 * Locale constants and type declarations.
 */
/** Constants */
declare const DEFAULT_LOCALE_CODE: LocaleCode;
/** Locale codes. */
type LocaleCode = 'en-au' | 'en-gb' | 'en-us' | 'es-es';
/** Localised string. */
type LocalisedString = Record<LocaleCode, string>;
/** Exports. */
export { DEFAULT_LOCALE_CODE };
export type { LocaleCode, LocalisedString };
