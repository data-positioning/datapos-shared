// Dependencies - Engine - Support
import type { DataUsageTypeId } from '../connection';

// Declaration - Preview Column
export class PreviewColumn {
    dataUsageTypeId: DataUsageTypeId;
    label: string;

    constructor(dataUsageTypeId: DataUsageTypeId, label: string) {
        this.dataUsageTypeId = dataUsageTypeId;
        this.label = label;
    }
}
