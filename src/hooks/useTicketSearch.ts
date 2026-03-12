import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../redux/store'
import type { SearchParams } from '../definitions/ticket'
import { useSearchTicketsMutation } from '../redux/api/ticketsApi'
import { setTicketsResult } from '../redux/slices/ticketSlice'
import { getCodeFromInput, getCityNameForDisplay } from '../constants/airports'
import { getErrorMessage } from '../utils/getErrorMessage'
import { defaultSearch } from '../constants/search'

export function useTicketSearch() {
    const dispatch = useDispatch<AppDispatch>()
    const [searchTickets] = useSearchTicketsMutation()
    const [searchParams, setSearchParams] = useState<SearchParams>(defaultSearch)

    const handleSearch = useCallback(
        async (params: SearchParams) => {
            const trimmedOrigin = params.origin.trim()
            const trimmedDestination = params.destination.trim()

            if (!trimmedOrigin || !trimmedDestination) {
            dispatch(
                setTicketsResult({
                tickets: [],
                loading: false,
                error: 'Заполните поля «Откуда» и «Куда», чтобы выполнить поиск.',
                }),
            )
            setSearchParams({
                ...params,
                origin: params.origin,
                destination: params.destination,
            })
            return
            }

            const origin = getCodeFromInput(params.origin) ?? params.origin
            const destination = getCodeFromInput(params.destination) ?? params.destination
            const date = params.date
            const request = { ...params, origin, destination, date }

            dispatch(setTicketsResult({ loading: true, error: null }))
            setSearchParams({
            ...params,
            date,
            origin: getCityNameForDisplay(params.origin),
            destination: getCityNameForDisplay(params.destination),
            })

            try {
                const { tickets, airlines } = await searchTickets(request).unwrap()
                dispatch(setTicketsResult({ tickets, airlines, loading: false, error: null }))
            } catch (err) {
                dispatch(setTicketsResult({ tickets: [], airlines: {}, loading: false, error: getErrorMessage(err) }))
            }
        },
        [dispatch, searchTickets]
    )

    return { searchParams, setSearchParams, handleSearch }
}
