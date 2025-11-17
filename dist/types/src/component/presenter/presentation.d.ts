import { ComponentConfig } from '..';
export interface PresentationConfig extends ComponentConfig {
    content: string;
    order: number;
}
export type PresentationCategoryId = 'cartesianChart' | 'chordDiagram' | 'periodFlowBoundariesChart' | 'polarChart' | 'rangeChart' | 'sankeyDiagram' | 'streamGraph' | 'valueTable';
export type PresentationCartesianTypeId = 'areaLine' | 'areaSpline' | 'bar' | 'column' | 'line' | 'pyramid' | 'spline';
export type PresentationPolarTypeId = 'areaLine' | 'areaSpline' | 'column' | 'line' | 'spline';
export type PresentationRangeTypeId = 'areaLine' | 'areaSpline' | 'bar' | 'column';
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
export interface PresentationView {
    resize: () => void;
    vendorId: string;
}
export declare const presentationViewTypeMap: Record<string, PresentationVisualViewType>;
