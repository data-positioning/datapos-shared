import { ComponentConfig } from '..';
export interface PresentationConfig extends ComponentConfig {
    content: string;
    order: number;
}
export type PresentationVisualConfig = {
    content: PresentationVisualContentConfig;
    views: PresentationVisualViewConfig[];
};
export type PresentationVisualContentConfig = {
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
};
export interface PresentationVisualViewConfig {
    categoryId: 'cartesian' | 'chordDiagram' | 'periodFlowBoundaries' | 'polar' | 'range' | 'sankeyDiagram' | 'streamgraph' | 'values';
    default?: boolean;
}
export interface PresentationVisualCartesianViewConfig extends PresentationVisualViewConfig {
    categoryId: 'cartesian';
    typeId: 'areaLine' | 'areaSpline' | 'bar' | 'column' | 'line' | 'pyramid' | 'spline';
}
export interface PresentationVisualChordDiagramViewConfig extends PresentationVisualViewConfig {
    categoryId: 'chordDiagram';
}
export interface PresentationVisualPeriodFlowBoundariesViewConfig extends PresentationVisualViewConfig {
    categoryId: 'periodFlowBoundaries';
}
export interface PresentationVisualPolarViewConfig extends PresentationVisualViewConfig {
    categoryId: 'polar';
    typeId: 'area' | 'column' | 'line';
}
export interface PresentationVisualRangeViewConfig extends PresentationVisualViewConfig {
    categoryId: 'range';
    typeId: 'area' | 'bar' | 'column';
}
export interface PresentationVisualSankeyDiagramViewConfig extends PresentationVisualViewConfig {
    categoryId: 'sankeyDiagram';
}
export interface PresentationVisualStreamgraphViewConfig extends PresentationVisualViewConfig {
    categoryId: 'streamgraph';
}
export interface PresentationVisualValuesViewConfig extends PresentationVisualViewConfig {
    categoryId: 'values';
}
export type PresentationVisualViewType = PresentationVisualCartesianViewType | PresentationVisualChordViewType | PresentationVisualPeriodFLowBoundariesViewType | PresentationVisualPolarViewType | PresentationVisualRangeViewType | PresentationVisualSankeyDiagramViewType | PresentationVisualStreamgraphViewType | PresentationVisualValuesViewType;
export type PresentationVisualCartesianViewType = {
    categoryId: 'cartesian';
    typeId: 'areaLine' | 'areaSpline' | 'bar' | 'column' | 'line' | 'pyramid' | 'spline';
    label: Record<string, string>;
    options: {
        highchartsType: 'area' | 'bar' | 'column' | 'line';
        inverted?: boolean;
    };
};
export type PresentationVisualChordViewType = {
    categoryId: 'chordDiagram';
    label: Record<string, string>;
    options: {};
};
export type PresentationVisualPeriodFLowBoundariesViewType = {
    categoryId: 'periodFlowBoundaries';
    label: Record<string, string>;
    options: {};
};
export type PresentationVisualPolarViewType = {
    categoryId: 'polar';
    typeId: 'area' | 'column' | 'line';
    label: Record<string, string>;
    options: {
        highchartsType: 'area' | 'column' | 'line';
        inverted?: boolean;
    };
};
export type PresentationVisualRangeViewType = {
    categoryId: 'range';
    typeId: 'area' | 'bar' | 'column';
    label: Record<string, string>;
    options: {
        highchartsType: 'arearange' | 'columnrange';
        inverted?: boolean;
    };
};
export type PresentationVisualSankeyDiagramViewType = {
    categoryId: 'sankeyDiagram';
    label: Record<string, string>;
    options: {};
};
export type PresentationVisualStreamgraphViewType = {
    categoryId: 'streamgraph';
    label: Record<string, string>;
    options: {};
};
export type PresentationVisualValuesViewType = {
    categoryId: 'values';
    label: Record<string, string>;
    options: {};
};
export interface PresentationView {
    resize: () => void;
    vendorId: string;
}
export declare const presentationViewTypeMap: Record<string, PresentationVisualViewType>;
