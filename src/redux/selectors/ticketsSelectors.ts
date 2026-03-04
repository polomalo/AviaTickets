import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import type { TicketItem } from '../../definitions/ticket'
import type { SortMode, TransferFilter } from '../../definitions/filters'
import { getTransferCount } from '../../utils/ticketUtils'

function getTotalDuration(t: TicketItem): number {
    const seg = t.segment?.[0]
    const flights = seg?.flight ?? []
    return t.total_duration ?? flights.reduce((s, f) => s + (f.duration ?? 0), 0)
}

function filterByTransfers(tickets: TicketItem[], transferFilter: TransferFilter): TicketItem[] {
    if (transferFilter.allTransfers || transferFilter.transferCounts.size === 0) {
        return tickets
    }
    return tickets.filter((t) => transferFilter.transferCounts.has(getTransferCount(t)))
}

function normalize(value: number, min: number, max: number): number {
    const range = max - min || 1
    return (value - min) / range
}

function sortByCheapest(list: TicketItem[]): TicketItem[] {
    return [...list].sort((a, b) => (a.priceRub ?? 0) - (b.priceRub ?? 0))
}

function sortByFastest(list: TicketItem[], durations: number[]): TicketItem[] {
    return [...list]
        .map((t, i) => [t, durations[i]] as const)
        .sort((a, b) => a[1] - b[1])
        .map((x) => x[0])
}

function sortByOptimal(list: TicketItem[], durations: number[]): TicketItem[] {
    const prices = list.map((t) => t.priceRub ?? 0)
    const minP = Math.min(...prices)
    const maxP = Math.max(...prices)
    const minD = Math.min(...durations)
    const maxD = Math.max(...durations)
    return [...list]
        .map((t, i) => ({
            t,
            score: normalize(prices[i], minP, maxP) + normalize(durations[i], minD, maxD),
        }))
        .sort((a, b) => a.score - b.score)
        .map((x) => x.t)
}

function sortTickets(list: TicketItem[], sortMode: SortMode): TicketItem[] {
    if (list.length === 0) return list
    const durations = list.map((t) => getTotalDuration(t))
    switch (sortMode) {
        case 'cheapest':
            return sortByCheapest(list)
        case 'fastest':
            return sortByFastest(list, durations)
        case 'optimal':
            return sortByOptimal(list, durations)
        default:
            return list
    }
}

export const selectFilteredAndSortedTickets = createSelector(
    [
        (state: RootState) => state.tickets.tickets,
        (_state: RootState, sortMode: SortMode) => sortMode,
        (_state: RootState, _sortMode: SortMode, transferFilter: TransferFilter) => transferFilter,
    ],
    (tickets, sortMode, transferFilter) => {
        const filtered = filterByTransfers(tickets, transferFilter)
        return sortTickets(filtered, sortMode)
    }
)
