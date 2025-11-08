import { Chart } from 'highcharts';
import { PresentationView, PresentationVisualCartesianViewType, PresentationVisualContentConfig, PresentationVisualPolarViewType, PresentationVisualRangeViewType } from '../index';
export interface HighchartsView extends PresentationView {
    chart: Chart;
}
export declare function useHighcharts(): {
    renderCartesianChart: (type: PresentationVisualCartesianViewType, contentConfig: PresentationVisualContentConfig, element: HTMLElement, callback?: () => void) => Promise<HighchartsView>;
    renderPolarChart: (type: PresentationVisualPolarViewType, content: PresentationVisualContentConfig, element: HTMLElement, callback?: () => void) => Promise<HighchartsView>;
    renderRangeChart: (type: PresentationVisualRangeViewType, content: PresentationVisualContentConfig, element: HTMLElement, callback?: () => void) => Promise<HighchartsView>;
};
