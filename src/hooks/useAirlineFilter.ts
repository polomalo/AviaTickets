import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import type { AirlineFilter } from '@/definitions/filters'

export function useAirlineFilter(): AirlineFilter {
    const { allAirlines, selectedAirlines } = useSelector((state: RootState) => state.airlinesFilter)
    return useMemo<AirlineFilter>(
        () => ({ allAirlines, selectedAirlines: new Set(selectedAirlines) }),
        [allAirlines, selectedAirlines]
    )
}
