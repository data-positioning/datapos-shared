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
export type PresentationVisualConfig = { content: PresentationVisualContentConfig; views: PresentationVisualViewConfig[] };
export type PresentationVisualContentConfig = {
    title?: { text: string };
    data: {
        label?: { text: string };
        dimension: { label?: { text: string }; values: { label?: { text: string } }[] };
        measures: { id: string; name: string; values: number[][] }[];
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

// Interface/Types - Presentation visual view type.
export type PresentationVisualViewType =
    | PresentationVisualCartesianViewType
    | PresentationVisualChordViewType
    | PresentationVisualPeriodFLowBoundariesViewType
    | PresentationVisualPolarViewType
    | PresentationVisualRangeViewType
    | PresentationVisualSankeyDiagramViewType
    | PresentationVisualStreamgraphViewType
    | PresentationVisualValuesViewType;
export type PresentationVisualCartesianViewType = {
    categoryId: 'cartesian';
    typeId: 'areaLine' | 'areaSpline' | 'bar' | 'column' | 'line' | 'pyramid' | 'spline';
    label: Record<string, string>;
    options: { highchartsType: 'area' | 'bar' | 'column' | 'line'; inverted?: boolean };
};
export type PresentationVisualChordViewType = { categoryId: 'chordDiagram'; label: Record<string, string>; options: {} };
export type PresentationVisualPeriodFLowBoundariesViewType = { categoryId: 'periodFlowBoundaries'; label: Record<string, string>; options: {} };
export type PresentationVisualPolarViewType = {
    categoryId: 'polar';
    typeId: 'area' | 'column' | 'line';
    label: Record<string, string>;
    options: { highchartsType: 'area' | 'column' | 'line'; inverted?: boolean };
};
export type PresentationVisualRangeViewType = {
    categoryId: 'range';
    typeId: 'area' | 'bar' | 'column';
    label: Record<string, string>;
    options: { highchartsType: 'arearange' | 'columnrange'; inverted?: boolean };
};
export type PresentationVisualSankeyDiagramViewType = { categoryId: 'sankeyDiagram'; label: Record<string, string>; options: {} };
export type PresentationVisualStreamgraphViewType = { categoryId: 'streamgraph'; label: Record<string, string>; options: {} };
export type PresentationVisualValuesViewType = { categoryId: 'values'; label: Record<string, string>; options: {} };

// Interface/Types - Presentation view.
export interface PresentationView {
    resize: () => void;
    vendorId: string;
}

// Constants
export const presentationViewTypeMap: Record<string, PresentationVisualViewType> = {
    cartesian_areaLine: { categoryId: 'cartesian', typeId: 'areaLine', label: { 'en-gb': 'Area Line' }, options: { highchartsType: 'area' } },
    cartesian_areaSpline: { categoryId: 'cartesian', typeId: 'areaSpline', label: { 'en-gb': 'Area Spline' }, options: { highchartsType: 'area' } },
    cartesian_bar: { categoryId: 'cartesian', typeId: 'bar', label: { 'en-gb': 'Bar' }, options: { highchartsType: 'bar' } },
    cartesian_column: { categoryId: 'cartesian', typeId: 'column', label: { 'en-gb': 'Column' }, options: { highchartsType: 'column' } },
    cartesian_line: { categoryId: 'cartesian', typeId: 'line', label: { 'en-gb': 'Line' }, options: { highchartsType: 'line' } },
    cartesian_pyramid: { categoryId: 'cartesian', typeId: 'line', label: { 'en-gb': 'Pyramid' }, options: { highchartsType: 'line' } },
    cartesian_spline: { categoryId: 'cartesian', typeId: 'line', label: { 'en-gb': 'Spline' }, options: { highchartsType: 'line' } },
    chordDiagram: { categoryId: 'chordDiagram', label: { 'en-gb': 'Chord Diagram' }, options: {} },
    periodFlowBoundaries: { categoryId: 'periodFlowBoundaries', label: { 'en-gb': 'Period Flow & Boundaries' }, options: {} },
    polar_area: { categoryId: 'polar', typeId: 'area', label: { 'en-gb': 'Radar (Area)' }, options: { highchartsType: 'area' } },
    polar_column: { categoryId: 'polar', typeId: 'column', label: { 'en-gb': 'Radar (Column)' }, options: { highchartsType: 'column' } },
    polar_line: { categoryId: 'polar', typeId: 'line', label: { 'en-gb': 'Radar (Line)' }, options: { highchartsType: 'line' } },
    range_area: { categoryId: 'range', typeId: 'area', label: { 'en-gb': 'Range (Area)' }, options: { highchartsType: 'arearange' } },
    range_bar: { categoryId: 'range', typeId: 'bar', label: { 'en-gb': 'Range (Bar)' }, options: { highchartsType: 'columnrange', inverted: true } },
    range_column: { categoryId: 'range', typeId: 'column', label: { 'en-gb': 'Range (Column)' }, options: { highchartsType: 'columnrange' } },
    sankeyDiagram: { categoryId: 'sankeyDiagram', label: { 'en-gb': 'Sankey Diagram' }, options: {} },
    streamgraph: { categoryId: 'streamgraph', label: { 'en-gb': 'Streamgraph' }, options: {} },
    values: { categoryId: 'values', label: { 'en-gb': 'Values' }, options: {} }
};
