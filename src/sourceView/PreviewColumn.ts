// Dependencies - Engine - Support
import type { FieldUsageTypeId } from '../connection';

// Declaration - Preview Column
export class PreviewColumn {
    dataUsageTypeId: FieldUsageTypeId;
    label: string;

    constructor(dataUsageTypeId: FieldUsageTypeId, label: string) {
        this.dataUsageTypeId = dataUsageTypeId;
        this.label = label;
    }
}
