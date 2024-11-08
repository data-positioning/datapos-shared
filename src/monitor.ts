// Interfaces/Types - Location Data
export type LocationData = { country: string; label: string; continentLabel: string };

// Interfaces/Types - Monitor Issue
export interface MonitorIssue {
    key: string;
    name: string;
    assigned_to: string | null;
    endString: string;
    endStamp: number;
    environment: 'production';
    created_by: {
        kind: string;
        name: string;
    };
    duration: number; // In seconds.
    severity: string | null;
    startString: string;
    startStamp: number;
    state: 'resolved' | 'unresolved';
}

// Interfaces/Types - Monitor Week Summary
export interface MonitorWeekSummary {
    number: number;
    startDate: Date;
    startStamp: number;
    endDate: Date;
    endStamp: number;
    durationSeconds: number;
}

// Interfaces/Types - Monitor Week Timings
export interface MonitorWeekTimings {
    weekId: string;
    averageDuration: number;
    count: number;
    totalDuration: number;
    timings: ({ locationId: string; averageDuration: number; count: number; totalDuration: number } & LocationData)[];
}

// Interfaces/Types - Monitor Issues Result
export interface MonitorIssuesResult {
    monitorId: string;
    issues: MonitorIssue[];
    weeks: MonitorWeekSummary[];
}

// Interfaces/Types - Monitor Timings Result
export interface MonitorTimingResult {
    monitorId: string;
    timings: MonitorWeekTimings[];
}
