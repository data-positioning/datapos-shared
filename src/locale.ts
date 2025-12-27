/**
 * Locale constants and type declarations.
 */

/** Constants */
const DEFAULT_LOCALE_CODE: LocaleCode = 'en-gb';

/** Locale codes. */
type LocaleCode = 'en-au' | 'en-gb' | 'en-us' | 'es-es';

/** Localised string. */
type LocalisedString = Record<LocaleCode, string>;

/** Exports. */
export { DEFAULT_LOCALE_CODE };
export type { LocaleCode, LocalisedString };
