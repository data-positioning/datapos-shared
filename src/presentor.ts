// Dependencies - Framework
import type { ComponentConfig } from './component';

// Interfaces/Types - Presentor
export interface IPresentor {
    readonly config: IPresentorConfig;

    getPresentation(id: string): IPresentation | undefined;
    list(path: string): IPresentorItemConfig[];
}

// Interfaces/Types - Presentor Configuration
export interface IPresentorConfig extends ComponentConfig {
    index: IPresentorItemConfig[];
}

// Interfaces/Types - Presentor Item Configuration
export interface IPresentorItemConfig {
    items: IPresentorItemConfig[];
    label: Record<string, string>;
    name: string;
    typeId: 'folder' | 'object'; // TODO: Maybe standardise.
}

// Interface/Types - Presentation
export interface IPresentation {
    readonly config: IPresentationConfig;
    render(data: IPresentationData, renderTo: string | HTMLElement | null, localeId?: string): void;
    resize: () => void;
    update: () => void;
}

// Interface/Types - Presentation Configuration
export interface IPresentationConfig {
    id: string;
    label: string;
    typeId: 'declarative' | 'coded';
    blocks?: IPresentationBlockConfig[];
}

// Interface/Types - Presentation Block Configuration
export interface IPresentationBlockConfig {
    config: IHighchartsBasicConfig | Record<string, unknown>;
    typeId?: 'chartJSBasic' | 'cytoscapeMarkov' | 'cytoscapeNetwork' | 'highchartsBasic' | 'table' | 'text';
}

// Interfaces/Types - Presentation Data
export interface IPresentationData {
    dimensions: { id: string; type: { id: string; spanId?: string; intervalId?: string }; intervals: { label: string }[] };
    measures: { id: string; label: string; values: number[] }[];
}

// Interfaces/Types - Highcharts Basic Configuration
interface IHighchartsBasicConfig {
    series: { typeId: TChartSeriesTypeId }[];
}

// Interfaces/Types - Basic Chart Series Type Identifier
type TChartSeriesTypeId = 'areaLine' | 'areaSpline' | 'bar' | 'column' | 'line' | 'pyramid' | 'spline';

// // Interfaces/Types - Presentation
// export interface IPresentation {
//     readonly items: IPresentationBlock[];
//     readonly prefix: Record<string, string>;
//     readonly label: Record<string, string>;
//     readonly suffix: Record<string, string>;
//     renderItems(data: IPresentationData, renderTo: string | HTMLElement | null, localeId?: string): Promise<void>;
//     renderPrefix(renderTo: string | HTMLElement | null, localeId?: string): void;
//     renderSuffix(renderTo: string | HTMLElement | null, localeId?: string): void;
//     renderTitle(renderTo: string | HTMLElement | null, localeId?: string): string;
// }

// // Interfaces/Types - Presentation Block
// export interface IPresentationBlock {
//     readonly prefix: Record<string, string>;
//     readonly label: Record<string, string>;
//     readonly suffix: Record<string, string>;
//     renderPrefix(renderTo: string | HTMLElement | null, localeId?: string): void;
//     renderSuffix(renderTo: string | HTMLElement | null, localeId?: string): void;
//     renderTitle(renderTo: string | HTMLElement | null, localeId?: string): string;
//     renderVisual(data: IPresentationData, renderTo: string | HTMLElement | null, localeId?: string): Promise<void>;
//     resize: () => void;
//     update: () => void;
// }

// // Interfaces/Types - Presentation Render Settings
// export interface IPresentationRenderSettings {
//     localeId?: string;
// }

// // Interfaces/Types - Basic Chart Options
// export interface IBasicChartOptions extends Record<string, unknown> {
//     isPolar: boolean;
//     // series: { label: string; typeId: TBasicChartSeriesTypeId | undefined; values: number[] }[];
//     typeId: TBasicChartSeriesTypeId;
// }
