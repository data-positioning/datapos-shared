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

export type PresentationCategoryId = 'cartesianChart' | 'chordDiagram' | 'periodFlowBoundariesChart' | 'polarChart' | 'rangeChart' | 'sankeyDiagram' | 'streamGraph' | 'valueTable';
export type PresentationCartesianTypeId = 'areaLine' | 'areaSpline' | 'bar' | 'column' | 'line' | 'pyramid' | 'spline';
export type PresentationPolarTypeId = 'areaLine' | 'areaRange' | 'areaSpline' | 'column' | 'line' | 'spline'; // TODO: One Highcharts demo suggests 'areaRange' is supported (https://www.highcharts.com/demo/polar/sand-signika?utm_source=chatgpt.com).
export type PresentationRangeTypeId = 'areaLine' | 'areaSpline' | 'bar' | 'column';

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
export interface PresentationVisualCartesianChartViewConfig extends PresentationVisualViewConfig {
    categoryId: 'cartesianChart';
    typeId: PresentationCartesianTypeId;
}
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
export interface PresentationVisualRangeChartViewConfig extends PresentationVisualViewConfig {
    categoryId: 'rangeChart';
    typeId: PresentationRangeTypeId;
}
export interface PresentationVisualSankeyDiagramViewConfig extends PresentationVisualViewConfig {
    categoryId: 'sankeyDiagram';
}
export interface PresentationVisualStreamGraphViewConfig extends PresentationVisualViewConfig {
    categoryId: 'streamGraph';
}
export interface PresentationVisualValueTableViewConfig extends PresentationVisualViewConfig {
    categoryId: 'valueTable';
}

// Interface/Types - Presentation visual view type.
export interface PresentationVisualViewType {
    categoryId: PresentationCategoryId;
}
export interface PresentationVisualCartesianChartViewType extends PresentationVisualViewType {
    categoryId: 'cartesianChart';
    typeId: PresentationCartesianTypeId;
    label: Record<string, string>;
}
export interface PresentationVisualChordDiagramViewType extends PresentationVisualViewType {
    categoryId: 'chordDiagram';
    label: Record<string, string>;
}
export interface PresentationVisualPeriodFlowBoundariesChartViewType extends PresentationVisualViewType {
    categoryId: 'periodFlowBoundariesChart';
    label: Record<string, string>;
}
export interface PresentationVisualPolarChartViewType extends PresentationVisualViewType {
    categoryId: 'polarChart';
    typeId: PresentationPolarTypeId;
    label: Record<string, string>;
}
export interface PresentationVisualRangeChartViewType extends PresentationVisualViewType {
    categoryId: 'rangeChart';
    typeId: PresentationRangeTypeId;
    label: Record<string, string>;
}
export interface PresentationVisualSankeyDiagramViewType extends PresentationVisualViewType {
    categoryId: 'sankeyDiagram';
    label: Record<string, string>;
}
export interface PresentationVisualStreamGraphViewType extends PresentationVisualViewType {
    categoryId: 'streamGraph';
    label: Record<string, string>;
}
export interface PresentationVisualValueTableViewType extends PresentationVisualViewType {
    categoryId: 'valueTable';
    label: Record<string, string>;
}

// Interface/Types - Presentation view.
export interface PresentationView {
    resize: () => void;
    vendorId: string;
}

// Constants
export const presentationViewTypeMap: Record<string, PresentationVisualViewType> = {
    cartesianChart_areaLine: { categoryId: 'cartesianChart', typeId: 'areaLine', label: { 'en-gb': 'Area Line' } } as PresentationVisualCartesianChartViewType,
    cartesianChart_areaSpline: { categoryId: 'cartesianChart', typeId: 'areaSpline', label: { 'en-gb': 'Area Spline' } } as PresentationVisualCartesianChartViewType,
    cartesianChart_bar: { categoryId: 'cartesianChart', typeId: 'bar', label: { 'en-gb': 'Bar' } } as PresentationVisualCartesianChartViewType,
    cartesianChart_column: { categoryId: 'cartesianChart', typeId: 'column', label: { 'en-gb': 'Column' } } as PresentationVisualCartesianChartViewType,
    cartesianChart_line: { categoryId: 'cartesianChart', typeId: 'line', label: { 'en-gb': 'Line' } } as PresentationVisualCartesianChartViewType,
    cartesianChart_pyramid: { categoryId: 'cartesianChart', typeId: 'pyramid', label: { 'en-gb': 'Pyramid' } } as PresentationVisualCartesianChartViewType,
    cartesianChart_spline: { categoryId: 'cartesianChart', typeId: 'spline', label: { 'en-gb': 'Spline' } } as PresentationVisualCartesianChartViewType,
    chordDiagram: { categoryId: 'chordDiagram', label: { 'en-gb': 'Chord Diagram' } } as PresentationVisualChordDiagramViewType,
    periodFlowBoundariesChart: { categoryId: 'periodFlowBoundariesChart', label: { 'en-gb': 'Period Flow & Boundaries' } } as PresentationVisualPeriodFlowBoundariesChartViewType,
    polarChart_areaLine: { categoryId: 'polarChart', typeId: 'areaLine', label: { 'en-gb': 'Radar (Area Line)' } } as PresentationVisualPolarChartViewType,
    polarChart_areaSpline: { categoryId: 'polarChart', typeId: 'areaSpline', label: { 'en-gb': 'Radar (Area Spline)' } } as PresentationVisualPolarChartViewType,
    polarChart_column: { categoryId: 'polarChart', typeId: 'column', label: { 'en-gb': 'Radar (Column)' } } as PresentationVisualPolarChartViewType,
    polarChart_line: { categoryId: 'polarChart', typeId: 'line', label: { 'en-gb': 'Radar (Line)' } } as PresentationVisualPolarChartViewType,
    polarChart_spline: { categoryId: 'polarChart', typeId: 'spline', label: { 'en-gb': 'Radar (Spline)' } } as PresentationVisualPolarChartViewType,
    rangeChart_areaLine: { categoryId: 'rangeChart', typeId: 'areaLine', label: { 'en-gb': 'Range (Area Line)' } } as PresentationVisualRangeChartViewType,
    rangeChart_areaSpline: { categoryId: 'rangeChart', typeId: 'areaSpline', label: { 'en-gb': 'Range (Area Spline)' } } as PresentationVisualRangeChartViewType,
    rangeChart_bar: { categoryId: 'rangeChart', typeId: 'bar', label: { 'en-gb': 'Range (Bar)' } } as PresentationVisualRangeChartViewType,
    rangeChart_column: { categoryId: 'rangeChart', typeId: 'column', label: { 'en-gb': 'Range (Column)' } } as PresentationVisualRangeChartViewType,
    sankeyDiagram: { categoryId: 'sankeyDiagram', label: { 'en-gb': 'Sankey Diagram' } } as PresentationVisualSankeyDiagramViewType,
    streamGraph: { categoryId: 'streamGraph', label: { 'en-gb': 'Streamgraph' } } as PresentationVisualStreamGraphViewType,
    valueTable: { categoryId: 'valueTable', label: { 'en-gb': 'Values' } } as PresentationVisualValueTableViewType
};
