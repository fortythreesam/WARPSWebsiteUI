export interface FilterOptions {
    title: string;
    maxPlayersLessThan: number;
    maxPlayersGreaterThan: number;
    minPlayersLessThan: number;
    minPlayersGreaterThan: number;
    minTimeLessThan: number;
    minTimeGreaterThan: number;
    maxTimeLessThan: number;
    maxTimeGreaterThan: number;
    complexityGreaterThan: number;
    complexityLessThan: number;
}
