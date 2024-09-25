// Interfaces/Types - Package Configuration
export interface PackageConfig {
    id: string;
    dependencyMap: { [name: string]: string };
    dependencies: { name: string; repo: string; version: string }[];
    version: string;
}

// Interfaces/Types - Package Data
export interface PackageData {
    description: string;
    downloads: { [yearMonth: string]: number };
    homePageURL: string;
    license: string;
    name: string;
    releases: { moment: string; version: string }[];
}
