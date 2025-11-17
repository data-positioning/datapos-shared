/**
 * Presentation composables, constants, errors, types/interfaces and utilities.
 */

// Dependencies - Framework.
import type { ComponentConfig } from '@/component';

// Interface/Types - Presentation.
export interface PresentationConfig extends ComponentConfig {
    content: string;
    order: number;
}

// Interface/Types - Presentation visual configuration.
export type PresentationVisualConfig = {
    content: PresentationVisualContentConfig;
    views: PresentationVisualViewConfig[];
};
export interface PresentationVisualContentConfig {
    title?: { text: string };
    data: {
        label?: { text: string };
        dimension: { label?: { text: string }; values: { label?: { text: string } }[] };
        measures: { id: string; name: string; values: number[][] }[];
    };
}

export interface PresentationVisualViewConfig {
    categoryId: PresentationCategoryId;
    default?: boolean;
}
export type PresentationCategoryId = 'cartesianChart' | 'chordDiagram' | 'periodFlowBoundariesChart' | 'polarChart' | 'rangeChart' | 'sankeyDiagram' | 'streamGraph' | 'valueTable';

export interface PresentationVisualCartesianChartViewConfig extends PresentationVisualViewConfig {
    categoryId: 'cartesianChart';
    typeId: PresentationCartesianTypeId;
}
export type PresentationCartesianTypeId = 'areaLine' | 'areaSpline' | 'bar' | 'column' | 'line' | 'spline';

export interface PresentationVisualChordDiagramViewConfig extends PresentationVisualViewConfig {
    categoryId: 'chordDiagram';
}

export interface PresentationVisualPeriodFlowBoundariesChartViewConfig extends PresentationVisualViewConfig {
    categoryId: 'periodFlowBoundariesChart';
}

export interface PresentationVisualPolarChartViewConfig extends PresentationVisualViewConfig {
    categoryId: 'polarChart';
    typeId: PresentationPolarTypeId;
}
export type PresentationPolarTypeId = 'areaLine' | 'areaRange' | 'areaSpline' | 'column' | 'line' | 'spline'; // TODO: One Highcharts demo suggests 'areaRange' (columnRange?) is supported (https://www.highcharts.com/demo/polar/sand-signika?utm_source=chatgpt.com).

export interface PresentationVisualRangeChartViewConfig extends PresentationVisualViewConfig {
    categoryId: 'rangeChart';
    typeId: PresentationRangeTypeId;
}
export type PresentationRangeTypeId = 'areaLine' | 'areaSpline' | 'bar' | 'column';

export interface PresentationVisualSankeyDiagramViewConfig extends PresentationVisualViewConfig {
    categoryId: 'sankeyDiagram';
}

export interface PresentationVisualStreamGraphViewConfig extends PresentationVisualViewConfig {
    categoryId: 'streamGraph';
}

export interface PresentationVisualValueTableViewConfig extends PresentationVisualViewConfig {
    categoryId: 'valueTable';
}

// Interface/Types - Presentation view.
export interface PresentationView {
    resize: () => void;
    vendorId: string;
}
