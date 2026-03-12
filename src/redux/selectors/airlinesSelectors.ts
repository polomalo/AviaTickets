import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'

export type AirlineOption = {
    code: string
    name: string
}

export type AirlinesFilterViewState = {
    airlineOptions: AirlineOption[]
    allAirlines: boolean
    selectedAirlines: string[]
}

export const selectAirlinesFilterView = createSelector(
    [
        (state: RootState) => state.tickets.tickets,
        (state: RootState) => state.tickets.airlines,
        (state: RootState) => state.airlinesFilter,
    ],
    (tickets, airlines, airlinesFilter): AirlinesFilterViewState => {
        const carriersSet = new Set<string>()
        for (const ticket of tickets) {
            for (const carrier of ticket.carriers) {
                carriersSet.add(carrier)
            }
        }

        const airlineOptions = [...carriersSet]
            .map((code) => ({
                code,
                name: airlines[code]?.name ?? code,
            }))
            .sort((a, b) => a.name.localeCompare(b.name))

        return {
            airlineOptions,
            allAirlines: airlinesFilter.allAirlines,
            selectedAirlines: airlinesFilter.selectedAirlines,
        }
    }
)
