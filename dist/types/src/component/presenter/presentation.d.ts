import { ComponentConfig } from '..';
export interface PresentationConfig extends ComponentConfig {
    content: string;
    order: number;
}
export type PresentationCategoryId = 'cartesianChart' | 'chordDiagram' | 'periodFlowBoundariesChart' | 'polarChart' | 'rangeChart' | 'sankeyDiagram' | 'streamGraph' | 'valueTable';
export type PresentationVisualConfig = {
    content: PresentationVisualContentConfig;
    views: PresentationVisualViewConfig[];
};
export interface PresentationVisualContentConfig {
    title?: {
        text: string;
    };
    data: {
        label?: {
            text: string;
        };
        dimension: {
            label?: {
                text: string;
            };
            values: {
                label?: {
                    text: string;
                };
            }[];
        };
        measures: {
            id: string;
            name: string;
            values: number[][];
        }[];
    };
}
export interface PresentationVisualViewConfig {
    categoryId: PresentationCategoryId;
    default?: boolean;
}
export interface PresentationVisualCartesianChartViewConfig extends PresentationVisualViewConfig {
    categoryId: 'cartesianChart';
    typeId: 'areaLine' | 'areaSpline' | 'bar' | 'column' | 'line' | 'pyramid' | 'spline';
}
export interface PresentationVisualChordDiagramViewConfig extends PresentationVisualViewConfig {
    categoryId: 'chordDiagram';
}
export interface PresentationVisualPeriodFlowBoundariesChartViewConfig extends PresentationVisualViewConfig {
    categoryId: 'periodFlowBoundariesChart';
}
export interface PresentationVisualPolarChartViewConfig extends PresentationVisualViewConfig {
    categoryId: 'polarChart';
    typeId: 'area' | 'column' | 'line';
}
export interface PresentationVisualRangeChartViewConfig extends PresentationVisualViewConfig {
    categoryId: 'rangeChart';
    typeId: 'area' | 'bar' | 'column';
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
export interface PresentationView {
    resize: () => void;
    vendorId: string;
}
export declare const presentationViewTypeMap: Record<string, PresentationVisualViewType>;
