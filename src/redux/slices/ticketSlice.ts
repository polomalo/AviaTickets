import { createSlice } from '@reduxjs/toolkit'
import type { TicketItem, AirlineInfo } from '../../definitions/ticket'

export type { SearchParams } from '../../definitions/ticket'

interface TicketsState {
    tickets: TicketItem[]
    airlines: Record<string, AirlineInfo>
    loading: boolean
    error: string | null
    hasSearched: boolean
}

const initialState: TicketsState = {
    tickets: [],
    airlines: {},
    loading: false,
    error: null,
    hasSearched: false,
}

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        setTicketsResult: (
            state,
            action: {
            payload: {
                tickets?: TicketItem[]
                airlines?: Record<string, AirlineInfo>
                loading?: boolean
                error?: string | null
            }
            }
        ) => {
            if (action.payload.tickets !== undefined) state.tickets = action.payload.tickets
            if (action.payload.airlines !== undefined) state.airlines = action.payload.airlines
            if (action.payload.loading !== undefined) state.loading = action.payload.loading
            if (action.payload.error !== undefined) state.error = action.payload.error
            state.hasSearched = true
        },
    },
})

export const { clearError, setTicketsResult } = ticketsSlice.actions
export default ticketsSlice.reducer
