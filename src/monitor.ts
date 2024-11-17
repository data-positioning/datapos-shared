// Interfaces/Types - Location Data
export type LocationData = { locationLabel: string; countryLabel: string; continentLabel: string };

// Interfaces/Types - Monitor Issue
export interface MonitorIssue {
    id: string;
    description: string;
    durationSeconds: number;
    from: string;
    fromTimestamp: number; // Used to support calculations.
    severity: 'outage' | 'minor_outage' | 'maintenance' | 'missing_data' | 'degraded_performance' | null;
    state: 'unresolved' | 'investigating' | 'identified' | 'monitoring' | 'resolved';
    to: string;
    toTimestamp: number; // Used to support calculations.
}

// Interfaces/Types - Monitor Issues by Week
export interface MonitorIssuesByWeek {
    weekNumber: number;
    from: string;
    fromTimestamp: number; // Used to support calculations.
    to: string;
    toTimestamp: number;
    totalDurationSeconds: number; // Used to support calculations.
}

// Interfaces/Types - Get Monitor Issues Result
export interface GetMonitorIssuesResult {
    monitorId: string;
    issues: MonitorIssue[];
    byWeek: MonitorIssuesByWeek[];
}

// Interfaces/Types - Monitor Timings by Vendor
// TODO

// Interfaces/Types - Monitor Timings by Location
export type MonitorTimingsByLocation = { locationId: string; count: number; totalDurationSeconds: number } & LocationData;

// // Interfaces/Types - Monitor Timings by Week
// export interface MonitorTimingsByWeek {
//     weekId: string;
//     count: number;
//     totalDurationSeconds: number;
//     byLocation: MonitorTimingsByLocation[];
// }

// Interfaces/Types - Get Monitor Timings Result
export interface GetMonitorTimingsByWeekResult {
    monitorId: string;
    weekIds: string[];
    weekValues: (Record<string, [number, number]> | null)[];
}
