// Interfaces/Types - Package Data
export interface PackageData {
    description: string;
    downloads: { [yearMonth: string]: number };
    homePageURL: string;
    license: string;
    name: string;
    releases: { moment: string; version: string }[];
}
