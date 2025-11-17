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
    typeId: PresentationVisualCartesianTypeId;
}
export type PresentationVisualCartesianTypeId = 'areaLine' | 'areaSpline' | 'bar' | 'column' | 'line' | 'pyramid' | 'spline';
export interface PresentationVisualChordDiagramViewConfig extends PresentationVisualViewConfig {
    categoryId: 'chordDiagram';
}
export interface PresentationVisualPeriodFlowBoundariesChartViewConfig extends PresentationVisualViewConfig {
    categoryId: 'periodFlowBoundariesChart';
}
export interface PresentationVisualPolarChartViewConfig extends PresentationVisualViewConfig {
    categoryId: 'polarChart';
    typeId: PresentationVisualPolarTypeId;
}
export type PresentationVisualPolarTypeId = 'area' | 'column' | 'line';
export interface PresentationVisualRangeChartViewConfig extends PresentationVisualViewConfig {
    categoryId: 'rangeChart';
    typeId: PresentationVisualRangeTypeId;
}
export type PresentationVisualRangeTypeId = 'area' | 'bar' | 'column';
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
    typeId: 'areaLine' | 'areaSpline' | 'bar' | 'column' | 'line' | 'pyramid' | 'spline';
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
    typeId: 'area' | 'column' | 'line';
    label: Record<string, string>;
}
export interface PresentationVisualRangeChartViewType extends PresentationVisualViewType {
    categoryId: 'rangeChart';
    typeId: 'area' | 'bar' | 'column';
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
    cartesian_areaLine: { categoryId: 'cartesianChart', typeId: 'areaLine', label: { 'en-gb': 'Area Line' } } as PresentationVisualCartesianChartViewType,
    cartesian_areaSpline: { categoryId: 'cartesianChart', typeId: 'areaSpline', label: { 'en-gb': 'Area Spline' } } as PresentationVisualCartesianChartViewType,
    cartesian_bar: { categoryId: 'cartesianChart', typeId: 'bar', label: { 'en-gb': 'Bar' } } as PresentationVisualCartesianChartViewType,
    cartesian_column: { categoryId: 'cartesianChart', typeId: 'column', label: { 'en-gb': 'Column' } } as PresentationVisualCartesianChartViewType,
    cartesian_line: { categoryId: 'cartesianChart', typeId: 'line', label: { 'en-gb': 'Line' } } as PresentationVisualCartesianChartViewType,
    cartesian_pyramid: { categoryId: 'cartesianChart', typeId: 'pyramid', label: { 'en-gb': 'Pyramid' } } as PresentationVisualCartesianChartViewType,
    cartesian_spline: { categoryId: 'cartesianChart', typeId: 'spline', label: { 'en-gb': 'Spline' } } as PresentationVisualCartesianChartViewType,
    chordDiagram: { categoryId: 'chordDiagram', label: { 'en-gb': 'Chord Diagram' } } as PresentationVisualChordDiagramViewType,
    periodFlowBoundariesChart: { categoryId: 'periodFlowBoundariesChart', label: { 'en-gb': 'Period Flow & Boundaries' } } as PresentationVisualPeriodFlowBoundariesChartViewType,
    polar_area: { categoryId: 'polarChart', typeId: 'area', label: { 'en-gb': 'Radar (Area)' } } as PresentationVisualPolarChartViewType,
    polar_column: { categoryId: 'polarChart', typeId: 'column', label: { 'en-gb': 'Radar (Column)' } } as PresentationVisualPolarChartViewType,
    polar_line: { categoryId: 'polarChart', typeId: 'line', label: { 'en-gb': 'Radar (Line)' } } as PresentationVisualPolarChartViewType,
    range_area: { categoryId: 'rangeChart', typeId: 'area', label: { 'en-gb': 'Range (Area)' } } as PresentationVisualRangeChartViewType,
    range_bar: { categoryId: 'rangeChart', typeId: 'bar', label: { 'en-gb': 'Range (Bar)' } } as PresentationVisualRangeChartViewType,
    range_column: { categoryId: 'rangeChart', typeId: 'column', label: { 'en-gb': 'Range (Column)' } } as PresentationVisualRangeChartViewType,
    sankeyDiagram: { categoryId: 'sankeyDiagram', label: { 'en-gb': 'Sankey Diagram' } } as PresentationVisualSankeyDiagramViewType,
    streamGraph: { categoryId: 'streamGraph', label: { 'en-gb': 'Streamgraph' } } as PresentationVisualStreamGraphViewType,
    valueTable: { categoryId: 'valueTable', label: { 'en-gb': 'Values' } } as PresentationVisualValueTableViewType
};
