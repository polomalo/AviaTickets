export type SortMode = 'cheapest' | 'fastest' | 'optimal';

export interface TransferFilter {
    allTransfers: boolean;
    transferCounts: Set<number>;
}

export interface AirlineFilter {
    allAirlines: boolean;
    selectedAirlines: Set<string>;
}
