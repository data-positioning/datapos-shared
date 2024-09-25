// Interfaces/Types - Session Data
export interface SessionData {
    label: string;
    monitorEvents: {
        [vendorId: string]: {
            [locationId: string]: {
                [regionId: string]: [number, number];
            };
        };
    };
}
