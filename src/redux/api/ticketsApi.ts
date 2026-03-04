import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { SearchParams } from '../../definitions/ticket'
import type { TicketItem } from '../../definitions/ticket'
import { parseTicketsResponse } from '../../utils/parseTicketsResponse'

const baseUrl = import.meta.env.VITE_API_URL ?? ''

export const ticketsApi = createApi({
    reducerPath: 'ticketsApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('Accept', 'application/json');
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        searchTickets: builder.mutation<TicketItem[], SearchParams>({
            query: (params) => ({
                url: '/search',
                method: 'POST',
                body: {
                    date: params.date,
                    origin: params.origin,
                    destination: params.destination,
                },
                responseHandler: 'text',
            }),
            transformResponse: (raw: string): TicketItem[] => parseTicketsResponse(raw),
            transformErrorResponse: (response: unknown) => {
                const err = response as { status?: number; data?: { message?: string } };
                const status = err?.status;
                let message = err?.data?.message;
                if (!message) {
                    if (status === 404) {
                    message = 'По заданным параметрам билеты не найдены.';
                    } else if (status === 400) {
                    message = 'Проверьте корректность введённых данных для поиска.';
                    } else {
                    message = status ? `Не удалось выполнить поиск билетов (ошибка ${status}).` : 'Не удалось выполнить поиск билетов.';
                    }
                }
                return { message };
            },
        }),
    }),
})

export const { useSearchTicketsMutation } = ticketsApi
