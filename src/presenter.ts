// Dependencies - Framework
import type { ComponentConfig } from './component';

// Interfaces/Types - Presenter
export interface Presenter {
    readonly config: PresenterConfig;

    list(path: string): PresenterItemConfig[];
    render(id: string, renderTo: string | HTMLElement): Promise<void>;
}

// Interfaces/Types - Presenter Configuration
export interface PresenterConfig extends ComponentConfig {
    index: PresenterItemConfig[];
}

// Interfaces/Types - Presenter Item Configuration
export interface PresenterItemConfig {
    items?: PresenterItemConfig[];
    label: Record<string, string>;
    name: string;
    typeId: 'folder' | 'object'; // TODO: Maybe standardise.
}

// Interface/Types - Presentation
export interface Presentation {
    readonly config: PresentationConfig;
    render(data: PresentationData, renderTo: string | HTMLElement | null, localeId?: string): void;
    resize: () => void;
    update: () => void;
}

// Interface/Types - Presentation Configuration
export interface PresentationConfig {
    id: string;
    label: string;
    typeId: 'declarative' | 'coded';
    blocks?: PresentationBlockConfig[];
}

// Interface/Types - Presentation Block Configuration
export interface PresentationBlockConfig {
    config: IHighchartsBasicConfig | Record<string, unknown>;
    typeId?: 'chartJSBasic' | 'cytoscapeMarkov' | 'cytoscapeNetwork' | 'highchartsBasic' | 'table' | 'text';
}

// Interfaces/Types - Presentation Data
export interface PresentationData {
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
// export interface Presentation {
//     readonly items: PresentationBlock[];
//     readonly prefix: Record<string, string>;
//     readonly label: Record<string, string>;
//     readonly suffix: Record<string, string>;
//     renderItems(data: PresentationData, renderTo: string | HTMLElement | null, localeId?: string): Promise<void>;
//     renderPrefix(renderTo: string | HTMLElement | null, localeId?: string): void;
//     renderSuffix(renderTo: string | HTMLElement | null, localeId?: string): void;
//     renderTitle(renderTo: string | HTMLElement | null, localeId?: string): string;
// }

// // Interfaces/Types - Presentation Block
// export interface PresentationBlock {
//     readonly prefix: Record<string, string>;
//     readonly label: Record<string, string>;
//     readonly suffix: Record<string, string>;
//     renderPrefix(renderTo: string | HTMLElement | null, localeId?: string): void;
//     renderSuffix(renderTo: string | HTMLElement | null, localeId?: string): void;
//     renderTitle(renderTo: string | HTMLElement | null, localeId?: string): string;
//     renderVisual(data: PresentationData, renderTo: string | HTMLElement | null, localeId?: string): Promise<void>;
//     resize: () => void;
//     update: () => void;
// }

// // Interfaces/Types - Presentation Render Settings
// export interface PresentationRenderSettings {
//     localeId?: string;
// }

// // Interfaces/Types - Basic Chart Options - TODO: Do we need to extend Record?
// export interface IBasicChartOptions extends Record<string, unknown> {
//     isPolar: boolean;
//     // series: { label: string; typeId: TBasicChartSeriesTypeId | undefined; values: number[] }[];
//     typeId: TBasicChartSeriesTypeId;
// }
