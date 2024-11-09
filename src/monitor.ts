// Interfaces/Types - Location Data
export type LocationData = { label: string; countryLabel: string; continentLabel: string };

// Interfaces/Types - Monitor Issue
export interface MonitorIssue {
    id: string;
    description: string;
    durationSeconds: number;
    from: string;
    severity: 'outage' | 'minor_outage' | 'maintenance' | 'missing_data' | 'degraded_performance' | null;
    state: 'unresolved' | 'investigating' | 'identified' | 'monitoring' | 'resolved';
    to: string;
}

// Interfaces/Types - Monitor Issues by Week
export interface MonitorIssuesByWeek {
    weekNumber: number;
    durationSeconds: number;
    from: Date;
    to: Date;
}

// Interfaces/Types - Get Monitor Issues Result
export interface GetMonitorIssuesResult {
    monitorId: string;
    issues: MonitorIssue[];
    byWeek: MonitorIssuesByWeek[];
}

// Interfaces/Types - Monitor Timings by Week
export interface MonitorTimingsByWeek {
    weekId: string;
    count: number;
    totalDurationSeconds: number;
    byLocation: ({ locationId: string; count: number; totalDurationSeconds: number } & LocationData)[];
}

// Interfaces/Types - Get Monitor Timings Result
export interface GetMonitorTimingsResult {
    monitorId: string;
    byWeek: MonitorTimingsByWeek[];
}
