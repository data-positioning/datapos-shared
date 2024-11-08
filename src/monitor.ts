// Interfaces/Types - Location Data
export type LocationData = { country: string; label: string; continentLabel: string };

// Interfaces/Types - Monitor Week Timings
export interface MonitorWeekTimings {
    weekId: string;
    averageDuration: number;
    count: number;
    totalDuration: number;
    timings: ({ locationId: string; averageDuration: number; count: number; totalDuration: number } & LocationData)[];
}
