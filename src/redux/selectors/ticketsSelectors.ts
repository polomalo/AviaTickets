import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import type { TicketItem } from '@/definitions/ticket'
import type { SortMode, TransferFilter, AirlineFilter } from '@/definitions/filters'
import { getTransferCount } from '@/utils/ticketUtils'

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

function filterByAirlines(tickets: TicketItem[], airlineFilter: AirlineFilter): TicketItem[] {
    if (airlineFilter.allAirlines || airlineFilter.selectedAirlines.size === 0) {
        return tickets
    }
    return tickets.filter((t) =>
        t.carriers.some((c) => airlineFilter.selectedAirlines.has(c))
    )
}

function applyFilters(tickets: TicketItem[], transferFilter: TransferFilter, airlineFilter: AirlineFilter): TicketItem[] {
    return filterByAirlines(filterByTransfers(tickets, transferFilter), airlineFilter)
}

function normalize(value: number, min: number, max: number): number {
    return (value - min) / (max - min || 1)
}

type TicketStats = {
    prices: number[]
    durations: number[]
    scores: number[]
    minPrice: number
    minDuration: number
    minScore: number
}

function computeStats(list: TicketItem[]): TicketStats {
    const prices = list.map((t) => t.priceRub ?? 0)
    const durations = list.map(getTotalDuration)

    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const minDuration = Math.min(...durations)
    const maxDuration = Math.max(...durations)

    const scores = list.map((_, i) =>
        normalize(prices[i], minPrice, maxPrice) + normalize(durations[i], minDuration, maxDuration)
    )
    const minScore = Math.min(...scores)

    return { prices, durations, scores, minPrice, minDuration, minScore }
}

function sortTickets(list: TicketItem[], sortMode: SortMode): TicketItem[] {
    if (list.length === 0) return list
    const { prices, durations, scores } = computeStats(list)

    const indexed = list.map((t, i) => ({ t, i }))

    switch (sortMode) {
        case 'cheapest':
            return indexed.sort((a, b) => prices[a.i] - prices[b.i]).map((x) => x.t)
        case 'fastest':
            return indexed.sort((a, b) => durations[a.i] - durations[b.i]).map((x) => x.t)
        case 'optimal':
            return indexed.sort((a, b) => scores[a.i] - scores[b.i]).map((x) => x.t)
        default:
            return list
    }
}

export const selectFilteredAndSortedTickets = createSelector(
    [
        (state: RootState) => state.tickets.tickets,
        (_s: RootState, sortMode: SortMode) => sortMode,
        (_s: RootState, _sm: SortMode, transferFilter: TransferFilter) => transferFilter,
        (_s: RootState, _sm: SortMode, _tf: TransferFilter, airlineFilter: AirlineFilter) => airlineFilter,
    ],
    (tickets, sortMode, transferFilter, airlineFilter) => {
        const filtered = applyFilters(tickets, transferFilter, airlineFilter)
        return sortTickets(filtered, sortMode)
    }
)

export type TicketLabel = 'самый дешевый' | 'самый быстрый' | 'оптимальный'

export const selectTicketLabels = createSelector(
    [
        (state: RootState) => state.tickets.tickets,
        (_s: RootState, transferFilter: TransferFilter) => transferFilter,
        (_s: RootState, _tf: TransferFilter, airlineFilter: AirlineFilter) => airlineFilter,
    ],
    (tickets, transferFilter, airlineFilter): Map<TicketItem, TicketLabel[]> => {
        const filtered = applyFilters(tickets, transferFilter, airlineFilter)
        if (filtered.length === 0) return new Map()

        const { prices, durations, scores, minPrice, minDuration, minScore } = computeStats(filtered)
        const labels = new Map<TicketItem, TicketLabel[]>()

        for (let i = 0; i < filtered.length; i++) {
            const ticketLabels: TicketLabel[] = []
            if (prices[i] === minPrice) ticketLabels.push('самый дешевый')
            if (durations[i] === minDuration) ticketLabels.push('самый быстрый')
            if (scores[i] === minScore) ticketLabels.push('оптимальный')
            if (ticketLabels.length > 0) labels.set(filtered[i], ticketLabels)
        }

        return labels
    }
)
