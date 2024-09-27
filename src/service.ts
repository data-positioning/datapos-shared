// Interfaces/Types - Service Data
export interface ServiceData {
    label: string;
    monitorEvents: {
        [vendorId: string]: {
            [locationId: string]: {
                [regionId: string]: [number, number];
            };
        };
    };
}
