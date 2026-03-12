import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import { DEFAULT_TRANSFER_OPTIONS } from '@/constants/search'
import { getTransferCount } from '@/utils/ticketUtils'

export const selectTransferOptions = createSelector(
    [(state: RootState) => state.tickets.tickets],
    (tickets) => {
        if (!tickets.length) return DEFAULT_TRANSFER_OPTIONS
        const maxStops = Math.max(...tickets.map(getTransferCount))
        return Array.from({ length: maxStops + 1 }, (_, i) => i)
    }
)

export type TransfersFilterViewState = {
    transferOptions: number[]
    allTransfers: boolean
    transferCounts: number[]
}

export const selectTransfersFilterView = createSelector(
    [
        (state: RootState) => state.tickets.tickets,
        (state: RootState) => state.transfersFilter,
    ],
    (tickets, transfersFilter): TransfersFilterViewState => {
        const transferOptions =
            !tickets.length
            ? DEFAULT_TRANSFER_OPTIONS
            : (() => {
                const maxStops = Math.max(...tickets.map(getTransferCount))
                return Array.from({ length: maxStops + 1 }, (_, i) => i)
                })()
        return {
            transferOptions,
            allTransfers: transfersFilter.allTransfers,
            transferCounts: transfersFilter.transferCounts,
        }
    }
)
