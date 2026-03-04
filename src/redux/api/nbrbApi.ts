import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { CurrencyCode } from '../../constants/currency'
import { CURRENCY_OPTIONS } from '../../constants/currency'
import { NBRB_RATES_URL } from '../../constants/currency'
import type { NbrbRateItem } from '../../definitions/currency'

const rawNbrbUrl = NBRB_RATES_URL ?? 'https://www.nbrb.by/api/exrates/rates?periodicity=0'
const nbrbUrl =
  rawNbrbUrl.startsWith('/')
    ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}${rawNbrbUrl}`
    : rawNbrbUrl

export type RatesMap = Partial<Record<CurrencyCode, { scale: number; rateToByn: number }>>

function mapRatesResponse(data: NbrbRateItem[]): RatesMap {
    const map: RatesMap = {};
    for (const item of data) {
        const abbr = item.Cur_Abbreviation as CurrencyCode;
        if (CURRENCY_OPTIONS.includes(abbr)) {
            map[abbr] = { scale: item.Cur_Scale, rateToByn: item.Cur_OfficialRate };
        }
    }
    return map;
}

export const nbrbApi = createApi({
    reducerPath: 'nbrbApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '',
        prepareHeaders: (headers) => {
            headers.set('Accept', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getNbrbRates: builder.query<RatesMap, void>({
            query: () => ({ url: nbrbUrl }),
            transformResponse: (data: NbrbRateItem[]): RatesMap => mapRatesResponse(data),
            transformErrorResponse: (response: unknown) => {
            const err = response as { status?: number; data?: { message?: string } };
            const message = err?.data?.message ?? (err != null ? `Ошибка ${err.status}` : 'Не удалось загрузить курсы валют');
            return { message };
            },
        }),
    }),
})

export const { useGetNbrbRatesQuery } = nbrbApi
